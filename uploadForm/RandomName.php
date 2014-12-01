<?php
class RandomName {
    private static $part1;
    private static $part2;
    private static $part3;
    private static $merge;
    private static $randomName;

    public static function createRandomName () {
        self::$part1 = range(1, 99);
        shuffle(self::$part1);
        self::$part2 = range(100, 199);
        shuffle(self::$part2);
        self::$part3 = range(1000, 1099);
        shuffle(self::$part3);
        self::$merge = [self::$part1[1], self::$part2[2], self::$part3[3]];
        shuffle(self::$merge);
        self::$randomName = time() . join('', self::$merge);
        return self::$randomName;
    }
}
?>