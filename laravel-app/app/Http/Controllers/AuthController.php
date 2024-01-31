<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        if($user = $request->validated())
            $user = User::create($user);
        if($user)
            return response()->json(['success' => true,'user' => $user], 201);

        return response()->json(['success' => false, 'data' => ''], 201);
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->validated())) {
            $token = auth()->user()->createToken('authToken')->plainTextToken;
            return response(['user' => auth()->user(), 'access_token' => $token]);
        } else {
            return response(['message' => 'Invalid credentials']);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'You are logged out successfully.'
        ]);
    }
}
