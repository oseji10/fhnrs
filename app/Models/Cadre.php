<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cadre extends Model
{
    protected $table = 'cadre';
    protected $primaryKey = 'cadreId';
    protected $fillable = ['cadreName', 'step', 'maximumStep', 'cadreGroupId', 'cadreSubGroupId', 'maximumGradeLevel'];
}
