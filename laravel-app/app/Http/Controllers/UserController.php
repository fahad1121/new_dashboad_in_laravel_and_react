<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function updateUserPassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required',
        ]);

        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['success' => false,'message' => 'Incorrect current password'], 401);
        }

        $user->update([
            'password' => bcrypt($request->newPassword),
        ]);

        return response()->json(['success' => true,'message' => 'Password updated successfully']);
    }
}
