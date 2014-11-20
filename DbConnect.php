<?php
class dbConnect
{
    private static $user = 'user';
    private static $pass = 'pass';
    private static $host = 'host';
    private static $dbname = 'imagegallery';

    public static $db;

    //konektvame se kam bazata danni
    public static function connect()
    {
        self::$db = mysqli_connect(self::$host, self::$user, self::$pass, self::$dbname) or die("Няма връзка с базата данни!");
        mysqli_set_charset(self::$db, 'utf8');
    }
}
?>
