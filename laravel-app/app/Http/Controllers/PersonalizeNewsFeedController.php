<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonalizeNewsFeedRequest;
use App\Models\Article;
use App\Models\PersonalizeNewsFeed;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PersonalizeNewsFeedController extends Controller
{
    public function saveNewsFeedPreferences(PersonalizeNewsFeedRequest $request)
    {
        if($data = $request->validated()){
            $personalizeNewsFeedData = PersonalizeNewsFeed::updateOrCreate(['user_id' => Auth::user()->id],$data);
            if($personalizeNewsFeedData->id){
                return response()->json(['success' => true, 'data' => 'News feed preference saved'],200);
            }
            return response()->json(['success' => false, 'data' => 'News feed preference could not update'],201);
        }
    }

    public function getAuthorList(): \Illuminate\Http\JsonResponse
    {
        $data['author'] = Article::select('id','author')->where('author','!=',NULL)->orderBy('id','asc')->get();
        if ($data){
            return response()->json(['success' => true, 'data' => $data],200);
        }

        return response()->json(['success' => true, 'data' => 'no data'],201);
    }

    public function getUserPreference()
    {
        $userPreferenceData = PersonalizeNewsFeed::where('user_id',Auth::user()->id)->first();

        if($userPreferenceData){
            return response()->json(['success' => true, 'data' => $userPreferenceData],200);
        }
        return response()->json(['success' => false, 'data' => 'No data'],201);
    }
}
