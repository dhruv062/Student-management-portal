# Laravel Application Setup Guide

## Overview

This is a step-by-step guide to set up and run your Laravel application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [PHP](https://www.php.net/) (>= 7.3)
- [Composer](https://getcomposer.org/)

- [MySQL](https://www.mysql.com/) or another database of your choice


# Modify these fields to your DB server details to setup the database

DB_CONNECTION=mysql
DB_HOST=skillify-db
DB_PORT=3306
DB_DATABASE=skillify
DB_USERNAME=root
DB_PASSWORD=

run ` composer install ` install php commands

run ` php artisan key:generate ` to generate unique key

use the ` php artisan migrate:refresh --seed ` to generate tables and seed the database

use ` php artisan serve ` to start the local server





