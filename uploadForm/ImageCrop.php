<?php
require('RandomName.php');
require('php-image-magician-v1.0/php_image_magician.php');

class CropImage
{
    private $cropArray;
    private $uploadDir = '../uploads/';
    private $imageRandName;
    private $uploadSubDirectories = ['original' => 'original/', 'middle' => 'mid/',
        'big' => 'big/', 'small' => 'small/'];
    private $files = array();
    private $fileNamesOnly = [];
    private $error = false;
    private $data = array();

    function CropImage()
    {
        foreach ($_FILES as $files) {
            if (!$this->validateImageType($files['tmp_name'])) {
                echo 'Error: Unsupported image type!';
                $this->error = true;
                return false;
            }

            $this->imageRandName = RandomName::createRandomName() . '.' .
                strtolower(explode('.', $files['name'])[count(explode('.', $files['name'])) - 1]);

            if (move_uploaded_file($files['tmp_name'],
                $this->uploadDir .
                $this->uploadSubDirectories['original'] .
                basename($this->imageRandName))) {
                    $this->files[] = $this->uploadDir .
                        $this->uploadSubDirectories['original'] .
                        basename($this->imageRandName);
                    $this->fileNamesOnly[] = basename($this->imageRandName);
            }
            else {
                $this->data = array('error' => 'error uploading files!');
            }

            $imageName = $this->uploadDir .
                $this->uploadSubDirectories['original'] .
                basename($this->imageRandName);

            $x = getimagesize($imageName)[0];
            $y = getimagesize($imageName)[1];

            $this->uploadAndCropSqrt($x, $y, $this->imageRandName, 'big');

            $this->createSqrtThumbnail(300, 'middle');
            $this->createSqrtThumbnail(100, 'small');
        }
        $this->data = ($this->error) ? array('error' => 'Unsupported file format!') :
            array('files' => $this->files, 'fileNames' => $this->fileNamesOnly);

        echo json_encode($this->data);
    }

    function createSqrtThumbnail ($side, $prefix) {
        $magicianObj = new imageLib($this->uploadDir .
            $this->uploadSubDirectories['big'] .
            $this->imageRandName);

        $magicianObj->resizeImage($side, $side);
        $magicianObj->saveImage($this->uploadDir .
            $this->uploadSubDirectories[$prefix] .
            $this->imageRandName);
    }

    function validateImageType ($image) {
        if (exif_imagetype($image) != IMAGETYPE_GIF &&
            exif_imagetype($image) != IMAGETYPE_JPEG &&
            exif_imagetype($image) != IMAGETYPE_PNG) {
                return false;
        }
        return true;
    }

    function uploadAndCropSqrt($x, $y, $imageName, $prefix = '')
    {
        if ($x == $y) {
            $this->cropArray = ['x' => $x, 'y' => $x, 'width' => $x, 'height' => $x];
        }
        else if ($x > $y) {
            $smallerSide = $y;
            $coordinate = ($x - $y) / 2;
            $this->cropArray = ['x' => $coordinate, 'y' => 0,
                'width' => $smallerSide, 'height' => $smallerSide];
        }
        else if ($x < $y) {
            $smallerSide = $x;
            $coordinate = ($y - $x) / 2;
            $this->cropArray = ['x' => 0, 'y' => $coordinate,
                'width' => $smallerSide, 'height' => $smallerSide];
        }
        else {
            return 'Error: wrong parameters!';
        }

        $canvas = $this->createCanvasCurrentType($imageName);
        $resultImage = imagecrop($canvas, $this->cropArray);
        $this->createImageCurrentType($imageName, $resultImage, $prefix);
    }

    function createCanvasCurrentType ($imageName) {
        $imageName = $this->uploadDir .
            $this->uploadSubDirectories['original'] .
            $imageName;

        switch (exif_imagetype($imageName)) {
            case IMAGETYPE_GIF:
                return imagecreatefromgif($imageName);
                break;
            case IMAGETYPE_JPEG:
                return imagecreatefromjpeg($imageName);
                break;
            case IMAGETYPE_PNG:
                return imagecreatefrompng($imageName);
                break;
            default:
                return "Error: Unsupported image type!";
        }
    }

    function createImageCurrentType ($imageName, $resultImage, $prefix='') {
        $imageNewName = $this->uploadDir . $this->uploadSubDirectories[$prefix] . $imageName;

        $imageName = $this->uploadDir .
            $this->uploadSubDirectories['original'] .
            $imageName;

        switch (exif_imagetype($imageName)) {
            case IMAGETYPE_GIF:
                imagegif($resultImage, $imageNewName, 100);
                break;
            case IMAGETYPE_JPEG:
                imagejpeg($resultImage, $imageNewName, 100);
                break;
            case IMAGETYPE_PNG:
                imagepng($resultImage, $imageNewName, 100);
                break;
            default:
                return "Error: Unsupported image type!";
        }
    }
}

if (isset($_FILES)) {
    new CropImage();
}
?>