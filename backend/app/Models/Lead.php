<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'email',
    'phone',
    'project_type',
    'subject',
    'message',
    'source',
    'status',
    'page_path',
    'ip_address',
    'user_agent',
])]
class Lead extends Model
{
    //
}
