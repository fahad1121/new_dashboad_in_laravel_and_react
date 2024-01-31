<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\PersonalizeNewsFeed;
use App\Models\Source;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function getArticles(){
        $getLoggedInUserPreference = PersonalizeNewsFeed::where('user_id',Auth::user()->id)->first();
        if($getLoggedInUserPreference){
            $articles_with_sources = Article::with(['Source' => function($query) use($getLoggedInUserPreference) {
                $query->where('id',$getLoggedInUserPreference->category)->orWhere('id',$getLoggedInUserPreference->source);
            }])->where('id',$getLoggedInUserPreference->author)->latest()->paginate(15);
        }
        else{
            $articles_with_sources = Article::with('Source')->latest()->paginate(15);
        }

        return response()->json(['success' => true, 'data' => $articles_with_sources],200);
    }
}
