<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Str;
use App\Models\Url;

class ShortenerController extends Controller
{
    public function shortener(Request $request)
    {
        
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        $token = $matches[1];

        try {
            $secretKey = env('JWT_SECRET'); 
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

     
            $fullUrl = $request->input('fullUrl');

            
            $short = Str::random(6);

            
            $url = Url::create([
                'full' => $fullUrl,
                'short' => $short,
                'user_id' => $decoded->id, 
                'clicks' => 0, 
            ]);

            return response()->json([
                'short' => url('/') . '/' . $url->short,
                'full' => $url->full,
                'id' => $url->id,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }

    public function getUrlsByUserId(Request $request)
    {
   
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

   
        $token = $matches[1];

        try {
          
            $secretKey = env('JWT_SECRET');
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

            $urls = Url::where('user_id', $decoded->id)->get();

         
            if ($urls->isEmpty()) {
                return response()->json(['error' => 'No URLs found for this user'], 404);
            }

    
            return response()->json([
                'urls' => $urls->map(function ($url) {
                    return [
                        'id' => $url->id,
                        'full' => $url->full,
                        'short' => url('/') . '/' . $url->short,
                        'clicks' => $url->clicks,
                    ];
                })
            ]);
        } catch (\Exception $e) {
          
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }
}
