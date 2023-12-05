<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\fetchForChallan;
use App\Http\Controllers\bankFetchDataController;
use App\Http\Controllers\ReceiveVoucherCallController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup', [UserController::class, 'signup']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/uploadcsv', [UploadController::class, 'store']);
Route::post('/update/{primaryKey}', [UploadController::class, 'update']);
Route::post('/feeChallanData/{email}', [fetchForChallan::class, 'feeChallanData']);
Route::post('/feeChallanGeneratedData/{email}', [fetchForChallan::class, 'feeChallanGeneratedData']);
Route::post('/feeChallanEmailedData/{email}', [fetchForChallan::class, 'feeChallanEmailedData']);
Route::post('/dropdownfill/{userId}', [fetchForChallan::class, 'fetchProgramNames']);
Route::put('/updatechallan/{id}', [fetchForChallan::class, 'updateGenrateChallan']);
Route::put('/deletechallan/{id}', [fetchForChallan::class, 'deletechallan']);
Route::post('/sendEmail/{id}/{email}/{studentName}/{programName}/{dueDate}', [fetchForChallan::class, 'sendEmail']);

//For bank

Route::post('/getVoucherDetail', [bankFetchDataController::class, 'getVoucherDetail']);
Route::get('/fetchVoucherDetail', [bankFetchDataController::class, 'fetchVoucherDetail']);
Route::post('/ReceiveFeeVoucher', [ReceiveVoucherCallController::class, 'ReceiveFeeVoucher']);


//For Accounts
Route::post('/accountsChallan/{email}', [fetchForChallan::class, 'AccountsChallan']);
Route::put('/verifychallan/{id}', [fetchForChallan::class, 'VerifyChallan']);
Route::put('/rejectchallan/{id}', [fetchForChallan::class, 'rejectchallan']);

