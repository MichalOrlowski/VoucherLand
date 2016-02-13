# VoucherLand

REST documentation:

## Authentication

All requests should contain token in header:

```json
{
  NaiveToken: NaiveToken
}
```

## Voucher generation API

### Generate vouchers in current campaign

`POST` `/api/vouchers/generate/:count`

### Generate vouchers with new campaign (**new one will override old one!**)

`POST` `/api/vouchers/generate/:count/campaign/:campaign`

##### Parameters

`count` - number of generated vouchers (1 >= N >= 100k)

`campaign` - name of new campaign (if there is no campaign name, last active will be used)

##### Response

```json
[
  {
    "voucherId": "COSTA2_0E3FzHh9",
    "usages": 5,
    "discount": 29,
    "discountType": "PLN",
    "_id": "56bef5a93b84a7a803520c6c"
  },
  {
    "voucherId": "COSTA2_uclKotWY",
    "usages": 1,
    "discount": 31,
    "discountType": "%",
    "_id": "56bef5a93b84a7a803520c6d"
  }
]
```

## Voucher API

### Get voucher by id

`GET` `/api/vouchers/:voucherId`

##### Response

```json
{
  "_id": "56beef73438e76d40500636e"
  "voucherId": "undefined_kShnoftO"
  "usages": 2
  "discount": 35
  "discountType": "PLN"
}
```

### Use voucher

`POST` `/api/vouchers/use/:voucherId`

##### Response

```json
{
  "_id": "56beef73438e76d40500636e"
  "voucherId": "undefined_kShnoftO"
  "usages": 0
  "discount": 35
  "discountType": "PLN"
}
```
