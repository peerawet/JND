<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    use HasFactory;

    protected $table = 'urls';

    protected $fillable = [
        'full',  
        'short', 
        'user_id', 
        'clicks', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
