<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class UserController extends Controller
{
    public function signup(Request $request)
    {
       

        $user = new User();
        log::debug($request->all());
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->role = $request->input('role');
        log::debug($user->save());

        return response()->json(['message' => 'Signup successful'], 201);
    }

    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = Str::random(32); // Generate a random token

        $user->token = $token; // Assign the token to the user's "token" field
        $user->save(); // Save the user to the database

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
           // 'token' => $token
        ], 200);
    } else {
        return response()->json([
            'message' => 'Invalid email or password'
        ], 401);
    }
}


}
