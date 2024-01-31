<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Source;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use jcobhams\NewsApi\NewsApi;

class UserDashboardFeedCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:user-dashboard-feed-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // NEWS.org API
        $this->addNewsApiData();
        //Guardian Api
        $this->addGuardianApiData();
        // New York Times Api
        $this->addNewYorkTimesApiData();
    }

    private function addNewsApiData(){
        $news = new NewsApi(config('app.news_api_key'));
        $sources = $news->getSources(null,'en',null);
        foreach($sources->sources as $source){
            $storeSourceToDb = new Source();
            $storeSourceToDb->source_id = $source->id;
            $storeSourceToDb->name = $source->name;
            $storeSourceToDb->description = $source->description;
            $storeSourceToDb->url =$source->url;
            $storeSourceToDb->category_name = $source->category;
            $storeSourceToDb->language = $source->language;
            $storeSourceToDb->country = $source->country;
            $storeSourceToDb->save();

            if($storeSourceToDb->id){

                $articles = $news->getEverything(null, $source->id, null, null, null, null, 'en', 'publishedAt', 50, 1);
                foreach($articles->articles as $article){
                    $addArticleToDb = new Article();
                    $addArticleToDb->source_id = $storeSourceToDb->id;
                    $addArticleToDb->title = $article->title;
                    $addArticleToDb->description = $article->description ? $article->description : '';
                    $addArticleToDb->url = $article->url;
                    $addArticleToDb->author = $article->author;
                    $addArticleToDb->published_at = Carbon::parse($article->publishedAt)->toDateString();
                    $addArticleToDb->save();

                }
            }
        }
    }
    private function addGuardianApiData(){

        $guardian = new Client();
        $guardian_response = $guardian->get(config('app.guardian_news_api_url').'&api-key='.config('app.guardian_news_api_key'));
        $guardian_data = json_decode($guardian_response->getBody(),true);

        $source = new Source();
        $source->source_id = 'the guardian';
        $source->name = 'guardian';
        $source->description = 'Guardian api data';
        $source->url = 'https://open-platform.theguardian.com/';
        $source->category_name = 'guardian';
        $source->language = 'en';
        $source->country = 'pk';
        $source->save();

        foreach($guardian_data['response']['results'] as $g_data){
            $article = new Article();
            $article->source_id = $source->id;
            $article->title = $g_data['webTitle'];
            $article->description = $g_data['blocks']['main']['bodyHtml'];
            $article->url = $g_data['webUrl'];
            $article->published_at = Carbon::parse($g_data['webPublicationDate'])->toDateString();
            $article->save();
        }
    }
    private function addNewYorkTimesApiData(){
        $nyt = new Client();
        $nyt_response = $nyt->get(config('app.new_york_times_api_url').'api-key='.config('app.new_york_times_api_key'));
        $nyt_data = json_decode($nyt_response->getBody(),true);

        $source = new Source();
        $source->source_id = 'The New York Times';
        $source->name = 'nyt';
        $source->description = 'The New York Times api data';
        $source->url = 'https://api.nytimes.com';
        $source->category_name = 'nyt news';
        $source->language = 'en';
        $source->country = 'pk';
        $source->save();

        foreach($nyt_data['response']['docs'] as $nyt_data){
            $article = new Article();
            $article->source_id = $source->id;
            $article->title = $nyt_data['headline']['main'];
            $article->description = $nyt_data['lead_paragraph'];
            $article->url = $nyt_data['web_url'];
            $article->published_at = Carbon::parse($nyt_data['pub_date'])->toDateString();
            $article->save();
        }
    }
}
