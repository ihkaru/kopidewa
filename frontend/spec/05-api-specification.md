# API Specification

This document specifies the API endpoints that the frontend application interacts with.

## Endpoints

### `GET /komoditas`

This endpoint retrieves a list of all commodities and their price history.

**Response Body:**

The response is a JSON array of commodity objects. Each object has the following structure:

```json
[
  {
    "nama": "Beras Cap Burung Hong (Medium)",
    "hargas": [
      {
        "tahun": "2024",
        "bulan": "10",
        "tanggal_angka": "01",
        "harga": "17000",
        "kecamatan": "Mempawah Hilir"
      },
      {
        "tahun": "2024",
        "bulan": "10",
        "tanggal_angka": "02",
        "harga": "17100",
        "kecamatan": "Mempawah Hilir"
      }
    ]
  }
]
```

**Field Descriptions:**

*   `nama` (string): The name of the commodity.
*   `hargas` (array): An array of price objects.
*   `tahun` (string): The year the price was recorded.
*   `bulan` (string): The month the price was recorded.
*   `tanggal_angka` (string): The day the price was recorded.
*   `harga` (string): The price of the commodity.
*   `kecamatan` (string): The district where the price was recorded.

### `GET /update_komoditas`

This endpoint triggers a process on the backend to update the commodity data from an external source. It is expected to return a success message.

**Response Body:**

```json
{
  "message": "Update process started successfully"
}
```
