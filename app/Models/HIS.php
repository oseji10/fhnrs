<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HIS extends Model
{
    protected $table = 'his';
    protected $primaryKey = 'HISId';
    protected $fillable = ['hisName', 'status'];
}
