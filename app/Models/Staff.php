<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class STAFF extends Model
{
    protected $table = 'staff';
    protected $primaryKey = 'staffId';
    protected $fillable = [
    'fileNumber',
    'surname',
    'firstName',
    'lastName',
    'otherNames',
    'dateOfBirth',
    'gender',
    'stateOfOrigin',
    'lgaOfOrigin',
    'dateOfFirstAppointment',
    'dateOfPresentAppointment',
    'dateOfConfirmation',
    'cadre',
    'accountNumber',
    'bankId',
    'PFANumber',
    'PFA',
    'NHFNumber',
    'HISNumber',
    "HIS",
    'dba',
    'userId',
    'status'];
}
