<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Admin Seed Credentials
    |--------------------------------------------------------------------------
    |
    | Used once by AdminUserSeeder to create/update the single admin account.
    | Change ADMIN_PASSWORD in .env and re-run the seeder to rotate it.
    |
    */

    'email' => env('ADMIN_EMAIL'),

    'password' => env('ADMIN_PASSWORD'),

];
