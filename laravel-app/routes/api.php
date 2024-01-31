<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PersonalizeNewsFeedController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Models\Article;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
   Route::get('get-articles',[HomeController::class,'getArticles']);
   Route::get('get-categories-and-sources',[SearchController::class,'getCategoryAndSources']);
   Route::get('get-author-list', [PersonalizeNewsFeedController::class,'getAuthorList']);
   Route::get('get-user-preference', [PersonalizeNewsFeedController::class,'getUserPreference']);
   Route::post('get-search-results',[SearchController::class,'getSearchResults']);
   Route::post('save-news-feed-preference',[PersonalizeNewsFeedController::class,'saveNewsFeedPreferences']);
   Route::post('update-user-password',[UserController::class,'updateUserPassword']);
   Route::post('logout',[AuthController::class,'logout']);
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
