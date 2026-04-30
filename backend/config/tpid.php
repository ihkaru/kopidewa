<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Konfigurasi Spesifik untuk Analisis TPID
    |--------------------------------------------------------------------------
    |
    | Konfigurasi ini memungkinkan aplikasi untuk disesuaikan dengan wilayah
    | ATM (Amati, Tiru, Modifikasi) yang berbeda.
    |
    */

    'region' => [
        'id' => env('TPID_REGION_ID', 'mempawah'),
        'name' => env('TPID_REGION_NAME', 'Kabupaten Mempawah'),
        'district' => env('TPID_DISTRICT', 'Mempawah Hilir'),
        'latitude' => env('TPID_LATITUDE', 0.36),
        'longitude' => env('TPID_LONGITUDE', 108.96),
    ],

    'sp2kp' => [
        'pasar_id' => env('SP2KP_PASAR_ID', 517), // Default: Pasar Sebukit Rama (Mempawah)
    ],

    'sheets' => [
        'harga_id' => env('GOOGLE_SHEET_ID_HARGA', '19T2PxHgnWvwLmVa-xfnQ9mlV0Qp0NtpAw57VMvKkvCk'),
        'gabungan_id' => env('GOOGLE_SHEET_ID_GABUNGAN', '1h_q8lzW-pVjTIVnEAtMnC3Wn-cMKRuktR42HgTBmpHM'),
    ],

    'locations' => [
        // Koordinat untuk analisis level kabupaten (Legacy / Reference)
        'mempawah' => [
            'name' => 'Kabupaten Mempawah',
            'latitude' => 0.36,
            'longitude' => 108.96,
        ],

        // Titik-titik sampel untuk analisis level provinsi
        'kalbar_regional' => [
            'singkawang' => [
                'name' => 'Singkawang',
                'latitude' => 0.91,
                'longitude' => 108.98,
            ],
            'sambas' => [
                'name' => 'Sambas',
                'latitude' => 1.35,
                'longitude' => 109.30,
            ],
            'pontianak' => [
                'name' => 'Pontianak',
                'latitude' => -0.02,
                'longitude' => 109.34,
            ],
            'sanggau' => [
                'name' => 'Sanggau',
                'latitude' => 0.12,
                'longitude' => 110.58,
            ]
        ],
    ],
];
