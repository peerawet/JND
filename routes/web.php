<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShortenerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UrlController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/




Route::get('/web/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::get('/{shortUrl}', [UrlController::class, 'redirectToFullUrl']);



Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);

Route::post('/api/shortener', [ShortenerController::class, 'shortener']);




Route::get('/api/get-shorten-by-id', [ShortenerController::class, 'getUrlsByUserId']);


Route::get('/api/get-all-users', [AdminController::class, 'getAllUsers']);
Route::get('/api/get-urls-by-user-id/{id}', [AdminController::class, 'getUrlsByUserId']);

