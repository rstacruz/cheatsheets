---
title: FFaker
subtitle: Fake data generator
logo: { set: icon-park-outline, name: magic }
category: Ruby libraries
last_verified_with: "ffaker 2.25."
created_at: 2012-03-29
updated: 2026-11-25
tier: t3
---

## FFaker

### Installing

```ruby
# gem install ffaker
require 'ffaker'
```

See: [ffaker usage](https://github.com/ffaker/ffaker#usage)

### Faker::Address

```ruby
Faker::Address.city #=> "Autumnside"
  #=> "South Brielleberg"
  #=> "West Alvera"

Faker::Address.street_name #=> "Greyson Rapid"
  #=> "Hoppe Grove"
  #=> "Reichert Lights"

Faker::Address.street_address #=> "98786 Neal Motorway"
  #=> "6619 Yvonne Dale"
  #=> "6143 Bailey Plaza"

Faker::Address.secondary_address #=> "Suite 560"
  #=> "Apt. 332"
  #=> "Apt. 411"
```

See: [FFaker::Address](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakeraddress)

### Faker::Company

```ruby
Faker::Company.name #=> "Pouros-Ondricka"
  #=> "Ward Group"
  #=> "Walter-Romaguera"

Faker::Company.suffix #=> "and Sons"
  #=> "LLC"
  #=> "and Sons"

Faker::Company.catch_phrase #=> "Versatile mobile help-desk"
  #=> "Extended fresh-thinking utilisation"
  #=> "Reactive coherent flexibility"

Faker::Company.bs #=> "extend one-to-one convergence"
  #=> "architect 24/7 interfaces"
  #=> "revolutionize viral vortals"

Faker::Company.position #=> "General Corporate President"
  #=> "Executive Department Consultant"
  #=> "Associate Director"
```

See: [FFaker::Company](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakercompany)

### Faker::Education

```ruby
Faker::Education.school #=> "Larkwood Institution"
  #=> "Whiteshire School"
  #=> "California International College"

Faker::Education.degree #=> "Bachelor of Science in..."
  #=> "Doctor of Medicine in Marketing Economics"
  #=> "Bachelor of Music in Marketing Development"

Faker::Education.degree_short #=> "MD in Industrial Arts"
  #=> "DPhil in Social Management"
  #=> "AB in Political Science"

Faker::Education.major #=> "Financial Philosophy"
  #=> "Social Arts"
  #=> "Business Accountancy"

Faker::Education.school_name #=> "Larkfield"
  #=> "Northshire"
  #=> "Lakepoint"
```

See: [FFaker::Education](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakereducation)

### Faker::Geolocation

```ruby
Faker::Geolocation.lat #=> 40.89505
  #=> 41.77117
  #=> 41.022921

Faker::Geolocation.lng #=> -115.120716573
  #=> -118.427610513239
  #=> -72.204989
```

See: [FFaker::Geolocation](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakergeolocation)

### Faker::Internet

```ruby
Faker::Internet.email #=> "dayna@auer.name"
  #=> "joy@nienowbradtke.info"
  #=> "bernhard@wyman.ca"

Faker::Internet.user_name #=> "emory"
  #=> "janelle_schamberger"
  #=> "brigitte.dooley"

Faker::Internet.domain_name #=> "langworth.biz"
  #=> "corkery.info"
  #=> "schroeder.uk"

Faker::Internet.disposable_email #=> "barrett@spamherelots.com"
  #=> "nicholaus@suremail.info"
  #=> "gladys@safetymail.info"

Faker::Internet.free_email #=> "lemuel@yahoo.com"
  #=> "nickolas.gulgowski@gmail.com"
  #=> "isaac_ankunding@gmail.com"

Faker::Internet.domain_word #=> "purdykutch"
  #=> "sauer"
  #=> "trantowmaggio"

Faker::Internet.domain_suffix #=> "us"
  #=> "info"
  #=> "biz"
```

See: [FFaker::Internet](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerinternet)

### Faker::Job

```ruby
Faker::Job.title #=> "Future Data Assistant"
  #=> "Product Division Technician"
  #=> "Product Research Developer"
```

See: [FFaker::Job](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerjob)

## Text

### Faker::Lorem

```ruby
Faker::Lorem.word #=> "sint"
  #=> "sit"
  #=> "omnis"

Faker::Lorem.sentence #=> "Expedita et aspernatur ..."
  #=> "Rem sunt voluptatem laborum ..."
  #=> "Ad explicabo atque culpa."

Faker::Lorem.paragraph #=> "Quidem deserunt qui ..."
  #=> "Dolor et quae quisquam ..."
  #=> "Fugiat sapiente vero ..."
```

See: [FFaker::Lorem](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerlorem)

### Faker::Lorem words

```ruby
Faker::Lorem.words(4) #=> ["repellat", "quos", ...]
  #=> ["porro", "molestias", "ut", ...]
  #=> ["blanditiis", "soluta", "enim", ...]

Faker::Lorem.sentence(5) #=> "Laborum sint voluptate ..."
  #=> "Autem atque eum laborum ..."
  #=> "Quaerat nam consectetur ..."

Faker::Lorem.sentences(3) #=> ["Culpa est.", "Quo ut.", ...]
  #=> ["Quos nihil est.", "Expedita ab ..."]
  #=> ["Quasi velit est.", "Eum id ..."]
```

See: [FFaker::Lorem](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerlorem)

### Faker::Lorem paragraphs

```ruby
Faker::Lorem.paragraphs(3) #=> ["Iusto mollitia ...", "Possimus ..."]
  #=> ["Ducimus non ...", "Aut eveniet ..."]
  #=> ["Dicta consequatur ...", "In deleniti ..."]
```

See: [FFaker::Lorem](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerlorem)

### Faker::HipsterIpsum

```ruby
Faker::HipsterIpsum.paragraph #=> "Wayfarers mustache ..."
  #=> "Tofu stumptown cliche ..."
  #=> "Skateboard fanny pack ..."
```

See: [FFaker::HipsterIpsum](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerhipsteripsum)

### Faker::HTMLIpsum

```ruby
Faker::HTMLIpsum.body #=> "<h1>Exercitationem et</h1>..."
  #=> "<h1>Excepturi sequi</h1><p>Quam ..."
  #=> "<h1>Iusto voluptatem</h1><p>Laborum ..."

Faker::HTMLIpsum.table #=> "<table><thead><tr><th>Voluptatem</th>..."
  #=> "<table><thead><tr><th>Impedit</th>..."
  #=> "<table><thead><tr><th>Iste</th>..."

Faker::HTMLIpsum.fancy_string #=> "<a href='#x'>Velit est</a>..."
  #=> "<code>aperiam reiciendis</code> ..."
  #=> "<a href='#y'>Neque et omnis</a>..."
```

See: [FFaker::HTMLIpsum](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerhtmlipsum)

## Names and products

### Faker::Name

```ruby
Faker::Name.name #=> "Trevion Herman V"
  #=> "Aracely Balistreri"
  #=> "Daphnee Terry Sr."

Faker::Name.first_name #=> "Aliza"
  #=> "Joseph"
  #=> "Orland"

Faker::Name.last_name #=> "Hand"
  #=> "Macejkovic"
  #=> "Heller"

Faker::Name.prefix #=> "Dr."
  #=> "Ms."
  #=> "Mr."

Faker::Name.suffix #=> "I"
  #=> "III"
  #=> "DDS"
```

See: [FFaker::Name](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakername)

### Faker::PhoneNumber

```ruby
Faker::PhoneNumber.phone_number #=> "335-364-4549 x430"
  #=> "040-278-4021 x753"
  #=> "420.645.4382"

Faker::PhoneNumber.short_phone_number #=> "473-412-3192"
  #=> "353-084-1297"
  #=> "080-546-2356"
```

See: [FFaker::PhoneNumber](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerphonenumber)

### Faker::Product

```ruby
Faker::Product.brand #=> "Trouffeforge"
  #=> "VIG"
  #=> "NDZ"

Faker::Product.product_name #=> "Air HD Viewer"
  #=> "HD Kit"
  #=> "Air HD Bridge"

Faker::Product.product #=> "Amnix Air HD Tuner"
  #=> "Panapod Audible Filter"
  #=> "Phuffe Disc Receiver"

Faker::Product.model #=> "I-422"
  #=> "J89"
  #=> "L6"
```

See: [FFaker::Product](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerproduct)

### Faker::NameCN

```ruby
Faker::NameCN.name #=> "姵书虞"
  #=> "修男嵇"
  #=> "瑜人军"

Faker::NameCN.last_first #=> "向坚舜"
  #=> "疏骏哲"
  #=> "秘合雪"

Faker::NameCN.first_name #=> "佑淑"
  #=> "燕谦"
  #=> "重生"

Faker::NameCN.last_name #=> "释"
  #=> "巩"
  #=> "麻"
```

See: [FFaker::NameCN](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakernamecn)

### Faker::NameDE

```ruby
Faker::NameDE.name #=> "Noelle Schuster"
  #=> "Bendix Schmid"
  #=> "Azra Neumann"

Faker::NameDE.first_name #=> "Victoria"
  #=> "Lotta"
  #=> "Mads"

Faker::NameDE.last_name #=> "Martin"
  #=> "Klein"
  #=> "Walter"

Faker::NameDE.prefix #=> "Frau"
  #=> "Prof."
  #=> "Prof."
```

See: [FFaker::NameDE](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakernamede)

### Faker::NameJA

```ruby
Faker::NameJA.name #=> "飛鳥田部"
  #=> "未杉浦"
  #=> "功本間"

Faker::NameJA.last_first #=> "青木杏子"
  #=> "棚原大貴"
  #=> "知名翔"

Faker::NameJA.first_name #=> "巴"
  #=> "浩子"
  #=> "沙耶"

Faker::NameJA.last_name #=> "小栗"
  #=> "高江洲"
  #=> "友寄"
```

See: [FFaker::NameJA](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakernameja)

## Locale variants

### Faker::NameRU

```ruby
Faker::NameRU.name #=> "Стелла Карнилина"
  #=> "Евгения Мазовская"
  #=> "Кузьма Ваиренко"

Faker::NameRU.last_name #=> "Манишева"
  #=> "Тюлева"
  #=> "Понченко"

Faker::NameRU.first_name #=> "Артур"
  #=> "Руслана"
  #=> "Зинаида"

Faker::NameRU.patronymic #=> "Мечеславович"
  #=> "Ионович"
  #=> "Исаевич"

Faker::NameRU.name(:male) #=> "Слежиков Роман Всеволодович"
  #=> "Осип Мугрузин"
  #=> "Джиджаев Гавриил Леванович"

Faker::NameRU.name(:female) #=> "Зиядтдинова Полина Людвиговна"
  #=> "Андреева Тереза Арсеновна"
  #=> "Дарина Минхазова"
```

See: [FFaker::NameRU](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakernameru)

### Faker::NameSN

```ruby
Faker::NameSN.name_sn #=> "mame Djaly Mbodj"
  #=> "Hatab Samy"
  #=> "Niouma Dramé"

Faker::NameSN.name_male #=> "serigne Yakou Diagne"
  #=> "serigne Sécouba Diagne"
  #=> "Sihalébé Badji"

Faker::NameSN.name_female #=> "Thiomba Niang"
  #=> "adjaratou Kiné Panduppy"
  #=> "Nini Gakou"

Faker::NameSN.first_name_male #=> "Khoudia"
  #=> "Sanokho"
  #=> "Diomaye"

Faker::NameSN.first_name_female #=> "Assa"
  #=> "Sahaba"
  #=> "Manthita"

Faker::NameSN.prefix_male #=> "eladji"
  #=> "eladji"
  #=> "serigne"

Faker::NameSN.prefix_female #=> "adjaratou"
  #=> "adja"
  #=> "adja"
```

See: [FFaker::NameSN](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakernamesn)

### Faker::PhoneNumberAU

```ruby
Faker::PhoneNumberAU.phone_number       #=> "0495 539 191"
                                        #=> "(05) 6838 2406"
                                        #=> "0496 013 652"
```

See: [FFaker::PhoneNumberAU](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerphonenumberau)

### Faker::PhoneNumberSN

```ruby
Faker::PhoneNumberSN.phone_number       #=> "77-356-93-09"
                                        #=> "33-891-67-75"
                                        #=> "33-886-02-02"
```

See: [FFaker::PhoneNumberSN](https://github.com/ffaker/ffaker/blob/main/REFERENCE.md#ffakerphonenumbersn)
