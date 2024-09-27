<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;

class UrlController extends Controller
{
    public function redirectToFullUrl($shortUrl)
    {
     
        $url = Url::where('short', $shortUrl)->first();

       
        if (!$url) {
            return abort(404, 'Short URL not found.');
        }

    
        $url->increment('clicks');

    
        return redirect()->away($url->full);
    }
}
