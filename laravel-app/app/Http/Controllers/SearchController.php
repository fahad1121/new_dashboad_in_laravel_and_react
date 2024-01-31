<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getCategoryAndSources(){
        $data['source_list'] = Source::select('id','name')->get();
        $data['categories_list'] = Source::select('id','category_name')->groupBy('id','category_name')->get();

        return response()->json(['success' => true,'data' => $data],200);
    }

    public function getSearchResults(Request $request)
    {
        $result = Article::with('Source')->when(!is_null($request['category']), function ($query) use ($request) {
            $query->whereHas('source', function ($subQuery) use ($request) {
                $subQuery->where('category_name', $request['category']);
            });
        })
            ->when(!is_null($request['source']), function ($query) use ($request) {
                $query->where('source_id', $request['source']);
            })
            ->when(!is_null($request['date']), function ($query) use ($request) {
                $parsedDate = Carbon::parse($request['date'])->toDateString();
                $query->whereDate('published_at', $parsedDate);
            })
            ->when(!is_null($request['keyword']), function ($query) use ($request) {
                $query->where(function ($subQuery) use ($request) {
                    $subQuery->where('title', 'LIKE', '%' . $request['custom_keyword'] . '%')
                        ->orWhere('description', 'LIKE', '%' . $request['custom_keyword'] . '%');
                });
            })
            ->get();

        return response()->json(['success' => true, 'data' => $result],200);
    }
}
