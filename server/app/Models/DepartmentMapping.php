<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentMapping extends Model
{
    protected $table = 'department_mapping';
    protected $primaryKey = 'department_mapping_id';
    public $timestamps = false;

    protected $fillable = [
        'department_mapping_id',
        'program_name',
        'user_id',
    ];
}
