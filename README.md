# VoucherLand

REST documentation:

## Authentication

All requests should contain token in header:

```
{
  NaiveToken: NaiveToken
}
```

## Voucher generation API

### Generate vouchers in specified campaign (if campaignName is empty, use current one)

`POST` `/api/vouchers/generate/:count`

##### Parameters

`count` - number of generated vouchers (1 >= N >= 100k)

##### Request

```
{
  campaignName=XMAS
  expirationDate=2017-01-23
}
```

##### Response

```json
[
    {
      "voucherId": "XMAS_Q5tkF8KX",
      "discount": 48,
      "discountType": "%",
      "usages": 2,
      "voucherPrefix": "XMAS",
      "_id": "56c0316a610c6dfc0b47d704"
    },
    {
      "voucherId": "XMAS_OaX4ffKe",
      "discount": 7,
      "discountType": "PLN",
      "usages": 5,
      "voucherPrefix": "XMAS",
      "_id": "56c0316a610c6dfc0b47d705"
    }
]
```

## Voucher API

### Get voucher by id

`GET` `/api/vouchers/:voucherId`

##### Response

```json
{
  "_id": "56beef73438e76d40500636e",
  "voucherId": "undefined_kShnoftO",
  "usages": 2,
  "discount": 35,
  "discountType": "PLN",
}
```

### Use voucher

`POST` `/api/vouchers/use/:voucherId`

##### Response

```json
{
  "_id": "56beef73438e76d40500636e",
  "voucherId": "undefined_kShnoftO",
  "usages": 0,
  "discount": 35,
  "discountType": "PLN",
}
```
