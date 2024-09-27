<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject; // Import the JWTSubject interface

class User extends Authenticatable implements JWTSubject // Implement the JWTSubject interface
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'tel',
        'role'
    ];

    // Method to return the unique identifier for the user
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // Method to return custom claims for the JWT
    public function getJWTCustomClaims()
    {
        return [];
    }
}
