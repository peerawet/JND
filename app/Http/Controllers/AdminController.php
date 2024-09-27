<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;
use App\Models\User;

class AdminController extends Controller
{
    // Method to fetch all users
    public function getAllUsers()
    {
        try {
            $users = User::all(); 


            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch users'], 500);
        }
    }

    
    public function getUrlsByUserId($id)
    {
        try {
            
            $user = User::find($id);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

           
            $urls = Url::where('user_id', $id)->get();

            
            return response()->json($urls, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch URLs for user'], 500);
        }
    }
}
