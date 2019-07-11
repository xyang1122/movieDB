<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'test' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'V ?L7z(v?5[P9set{>{xiic-S4IhB+Q;~n*TI#CP{KgjlF]ROX7~h`WNxvjf2[>K' );
define( 'SECURE_AUTH_KEY',  '4>0kZ;|EyT;CViFL#vBz[DL7]S,I@o0Zg+aIBrw^LFkK]}utk>6W&yG`a#HGl,*1' );
define( 'LOGGED_IN_KEY',    'kwdqG^^7J15?SpfCwo5ib+<LOJ0n}/t<8&VuLEx(yCH3Z.!7gAMB`Mii#`?wMB79' );
define( 'NONCE_KEY',        'pd#;ZM[k3Mfi_eDS?/4/dmIS[Q`(;g)GF,F_ z{HG,.AXxSZzy,DDtdNR[Y<(% i' );
define( 'AUTH_SALT',        '2-[_Zt5}Zz}o(-GB>QOSe*pr3<+{`Li{lDnJVyeQF5!u4IabI8y~D1>ORKs[/q|I' );
define( 'SECURE_AUTH_SALT', 'C>Hf=xDsfc{Sq`Y)BtlBvh[Fyx0N?_$+Ad$[{`~cCQufO^3?rMVKXT.yns3S}mVV' );
define( 'LOGGED_IN_SALT',   '/x26ucSo97+6]ahHH`loB7Wpig0%dLf:brV:<3->>G!j_!U4xf4CIf8ua@+Mylh.' );
define( 'NONCE_SALT',       'jhb~pMXUMh#v5ayehbla2DTgNX=*R:dSVevmC|4)Xt+E*zKIc2E`ZI%@b^W|_ xe' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
