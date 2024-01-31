<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    public function Source()
    {
        return $this->belongsTo(Source::class);
    }

    public function getPublishedAtAttribute($value): string
    {
        $dateTime = new DateTime($value);
        return $dateTime->format('Y-m-d');
    }
}
