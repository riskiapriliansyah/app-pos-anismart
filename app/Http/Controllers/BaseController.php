<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @param $result
     * @param $message
     *
     * @return \Illuminate\Http\Response
     */

    public function sendResponse($result, $message, $code = 200)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
            'time' => Carbon::now()->toDateTimeString()
        ];
        return response()->json($response, $code);
    }

    /**
     * return error response.
     *
     * @param $error
     * @param  array  $errorMessages
     * @param  int  $code
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($title, $desc)
    {
        //simpan ke table
        // Log::create([
        //     'id' => Str::Uuid(),
        //     'user_id' => Auth::id(),
        //     'title' => $title,
        //     'desc' => $desc,
        //     'type' => 0,
        // ]);

        //response
        $response = [
            'success' => false,
            'message' => $desc,
        ];
        //return
        return response()->json($response, 404);
    }


    /**
     * return Unauthorized response.
     *
     * @param $error
     * @param  int  $code
     *
     * @return \Illuminate\Http\Response
     */
    public function unauthorizedResponse($error = 'Forbidden', $code = 403, $userId = 0)
    {
        $response = [
            'success' => false,
            'message' => $error,
            'userId' => $userId,
        ];

        return response()->json($response, $code);
    }

    public function toPcs($qty, $unit)
    {
        $split = explode('/', $qty);
        $box = $split[0];
        $pcs = $split[1];
        $box = $box * $unit;
        $box += $pcs;
        return $box;
    }

    public function toBox($qty, $unit)
    {
        $isNigga = false;
        if ($qty < 0) {
            $isNigga = true;
            $qty = abs($qty);
        }
        $r = 0;
        $box = floor($qty / $unit);
        $pcs = $qty % $unit;
        if ($isNigga) {
            $box = "-" . $box;
        }
        $r = $box . "/" . $pcs;
        return $r;
    }

    // baca promo
    public function Promo($promo)
    {
        return $promo;
    }
}
