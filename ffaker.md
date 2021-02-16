---
title: FFaker
category: Ruby libraries
layout: 2017/sheet
updated: 2017-09-12
---

## FFaker
{: .-one-column}

### Installing

```ruby
# gem install ffaker
require 'ffaker'
```

## Faker::Address
{: .-one-column}

```ruby
Faker::Address.city                     #=> "Autumnside"
                                        #=> "South Brielleberg"
                                        #=> "West Alvera"
```

```ruby
Faker::Address.street_name              #=> "Greyson Rapid"
                                        #=> "Hoppe Grove"
                                        #=> "Reichert Lights"
```

```ruby
Faker::Address.street_address           #=> "98786 Neal Motorway"
                                        #=> "6619 Yvonne Dale"
                                        #=> "6143 Bailey Plaza"
```

```ruby
Faker::Address.secondary_address        #=> "Suite 560"
                                        #=> "Apt. 332"
                                        #=> "Apt. 411"
```

## Faker::Company
{: .-one-column}

```ruby
Faker::Company.name                     #=> "Pouros-Ondricka"
                                        #=> "Ward Group"
                                        #=> "Walter-Romaguera"
```

```ruby
Faker::Company.suffix                   #=> "and Sons"
                                        #=> "LLC"
                                        #=> "and Sons"
```

```ruby
Faker::Company.catch_phrase             #=> "Versatile mobile help-desk"
                                        #=> "Extended fresh-thinking utilisation"
                                        #=> "Reactive coherent flexibility"
```

```ruby
Faker::Company.bs                       #=> "extend one-to-one convergence"
                                        #=> "architect 24/7 interfaces"
                                        #=> "revolutionize viral vortals"
```

```ruby
Faker::Company.position                 #=> "General Corporate President"
                                        #=> "Executive Department Consultant"
                                        #=> "Associate Director"
```

## Faker::Education
{: .-one-column}

```ruby
Faker::Education.school                 #=> "Larkwood Institution"
                                        #=> "Whiteshire School"
                                        #=> "California International College"
```

```ruby
Faker::Education.degree                 #=> "Bachelor of Science in Political Administration"
                                        #=> "Doctor of Medicine in Marketing Economics"
                                        #=> "Bachelor of Music in Marketing Development"
```

```ruby
Faker::Education.degree_short           #=> "MD in Industrial Arts"
                                        #=> "DPhil in Social Management"
                                        #=> "AB in Political Science"
```

```ruby
Faker::Education.major                  #=> "Financial Philosophy"
                                        #=> "Social Arts"
                                        #=> "Business Accountancy"
```

```ruby
Faker::Education.school_name            #=> "Larkfield"
                                        #=> "Northshire"
                                        #=> "Lakepoint"
```

## Faker::Geolocation
{: .-one-column}

```ruby
Faker::Geolocation.lat                  #=> 40.89505
                                        #=> 41.77117
                                        #=> 41.022921
```

```ruby
Faker::Geolocation.lng                  #=> -115.120716573
                                        #=> -118.427610513239
                                        #=> -72.204989
```

## Faker::Internet
{: .-one-column}

```ruby
Faker::Internet.email                   #=> "dayna@auer.name"
                                        #=> "joy@nienowbradtke.info"
                                        #=> "bernhard@wyman.ca"
```

```ruby
Faker::Internet.user_name               #=> "emory"
                                        #=> "janelle_schamberger"
                                        #=> "brigitte.dooley"
```

```ruby
Faker::Internet.domain_name             #=> "langworth.biz"
                                        #=> "corkery.info"
                                        #=> "schroeder.uk"
```

```ruby
Faker::Internet.disposable_email        #=> "barrett_schroeder@spamherelots.com"
                                        #=> "nicholaus@suremail.info"
                                        #=> "gladys@safetymail.info"
```

```ruby
Faker::Internet.free_email              #=> "lemuel@yahoo.com"
                                        #=> "nickolas.gulgowski@gmail.com"
                                        #=> "isaac_ankunding@gmail.com"
```

```ruby
Faker::Internet.domain_word             #=> "purdykutch"
                                        #=> "sauer"
                                        #=> "trantowmaggio"
```

```ruby
Faker::Internet.domain_suffix           #=> "us"
                                        #=> "info"
                                        #=> "biz"
```

## Faker::Job
{: .-one-column}

```ruby
Faker::Job.title                        #=> "Future Data Assistant"
                                        #=> "Product Division Technician"
                                        #=> "Product Research Developer"
```

## Faker::Lorem
{: .-one-column}

```ruby
Faker::Lorem.word                       #=> "sint"
                                        #=> "sit"
                                        #=> "omnis"
```

```ruby
Faker::Lorem.sentence                   #=> "Expedita et aspernatur eum sit ipsam culpa."
                                        #=> "Rem sunt voluptatem laborum dolores."
                                        #=> "Ad explicabo atque culpa."
```

```ruby
Faker::Lorem.paragraph                  #=> "Quidem deserunt qui atque labore sunt quis laborum. Et iste
                                        #    laudantium nobis adipisci delectus. Quod vero repudiandae m
                                        #    agni repellat totam. Id ullam a aperiam et laboriosam. Volup
                                        #    tas aut perspiciatis o..."
                                        #=> "Dolor et quae quisquam placeat. Accusantium quidem totam no
                                        #    n et deleniti accusamus hic. Iure quidem inventore molestiae
                                        #    harum magni dolor. Deleniti ex a voluptas nihil temporibus.
                                        #    "
                                        #=> "Fugiat sapiente vero voluptatum natus assumenda quam beatae
                                        #    in. Nemo velit incidunt dolor perspiciatis. Ipsum minima oc
                                        #    caecati est laudantium ducimus libero. Et fugit et adipisci
                                        #    molestias. Cupiditate ..."
```

```ruby
Faker::Lorem.words(4)                   #=> ["repellat", "quos", "amet", "voluptatem"]
                                        #=> ["porro", "molestias", "ut", "qui"]
                                        #=> ["blanditiis", "soluta", "enim", "fugit"]
```

```ruby
Faker::Lorem.sentence(5)                #=> "Laborum sint voluptate voluptatem rem doloremque et incidun
                                        #    t itaque."
                                        #=> "Autem atque eum laborum alias perspiciatis debitis suscipit
                                        #    deserunt sint."
                                        #=> "Quaerat nam consectetur eum dolor deleniti tempore doloremq
                                        #    ue et aspernatur."
```

```ruby
Faker::Lorem.sentences(3)               #=> ["Culpa debitis architecto est.", "Quo et voluptatem distinc
                                        #    tio repellendus qui cupiditate.", "Quo repellendus ut eius."
                                        #    ]
                                        #=> ["Quos nihil dolorem quidem maxime.", "Expedita ab veniam do
                                        #    lorum at et placeat iure.", "In perspiciatis cupiditate amet
                                        #    non saepe consequatur molestias minus."]
                                        #=> ["Quasi velit et voluptas est.", "Dolores ut dolor aut repel
                                        #    lat fuga minima sed quia.", "Eum id minus atque ex modi."]
```

```ruby
Faker::Lorem.paragraphs(3)              #=> ["Iusto mollitia sequi nam perspiciatis fuga aut. Modi moles
                                        #    tiae consectetur architecto et dolorem aut perferendis. Cumq
                                        #    ue rerum aliquam sapiente. Dolorum quo reiciendis nemo vero.
                                        #    Quo earum explicabo pariatur.", "Possimus omnis accusamus f
                                        #    uga. Harum sint facere sed dolor itaque quia. Ullam optio at
                                        #    que vel nihil facilis quidem accusantium sint.", "Itaque per
                                        #    ferendis saepe pariatur maxime expedita laborum qui. Ea nemo
                                        #    dolor aut. In sed sit minus itaque sit."]
                                        #=> ["Ducimus non quo qui doloremque aperiam aspernatur. Consequ
                                        #    atur id qui sit occaecati. Incidunt tempora quia et. Esse vo
                                        #    luptatem debitis similique ab totam sit. Illo neque vel face
                                        #    re maxime voluptatum non voluptatem.", "Aut eveniet consequa
                                        #    tur laudantium veniam qui dolores. Provident pariatur perspi
                                        #    ciatis id. Eum iste id quasi. Esse nihil quis rerum laudanti
                                        #    um aliquam molestiae eum tempora.", "Quia porro sint numquam
                                        #    qui. Ut sint reiciendis quis pariatur veniam nesciunt optio
                                        #    . Officia unde fugit distinctio dolorem voluptatem incidunt.
                                        #    Ex omnis sit et non aut."]
                                        #=> ["Dicta consequatur sapiente saepe fugiat ut. Necessitatibus
                                        #    enim explicabo qui fugiat occaecati expedita quis. Quo iust
                                        #    o magnam facere nihil earum.", "In deleniti explicabo veniam
                                        #    dolorem temporibus enim. Delectus exercitationem ipsum dolo
                                        #    r modi. Aut quia voluptas velit sint aperiam sed eveniet.",
                                        #    "Quo doloribus explicabo ut magnam quasi. Voluptatem debitis
                                        #    quaerat aperiam. Accusantium quis voluptatem dolorem."]
```

## Faker::HipsterIpsum
{: .-one-column}

```ruby
Faker::HipsterIpsum.paragraph           #=> "Wayfarers mustache thundercats pitchfork messenger bag high
                                        #    life. Beard messenger bag wayfarers squid vinyl letterpress
                                        #    party iphone jean shorts. Lomo irony before they sold out e
                                        #    thical wayfarers scene..."
                                        #=> "Tofu stumptown cliche sartorial vhs letterpress keffiyeh wi
                                        #    lliamsburg. Whatever jean shorts williamsburg lomo salvia fo
                                        #    od truck 8-bit. Cosby sweater portland artisan wayfarers vhs
                                        #    photo booth."
                                        #=> "Skateboard fanny pack wes anderson sartorial cred gluten-fr
                                        #    ee vinyl marfa locavore. Messenger bag master cleanse mlkshk
                                        #    vegan thundercats beard wes anderson brunch. Helvetica mess
                                        #    enger bag lo-fi four l..."
```

## Faker::HTMLIpsum
{: .-one-column}

```ruby
Faker::HTMLIpsum.body                   #=> "<h1>Exercitationem et</h1><table><thead><tr><th>Eligendi</t
                                        #    h><th>Vel</th><th>Sed</th><th>At</th></tr></thead><tbody><tr
                                        #    ><..."
                                        #=> "<h1>Excepturi sequi</h1><table><thead><tr><th>Quam</th><th>
                                        #    Eius</th><th>Quibusdam</th><th>Totam</th></tr></thead><tbody
                                        #    ><tr>..."
                                        #=> "<h1>Iusto voluptatem</h1><p>Laborum velit ducimus eius. Mol
                                        #    estiae id vel ipsam a accusantium et ut. Sunt et fugiat qui
                                        #    sint ab quia. Eum ut molestiae cumque molestiae error volupt
                                        #    ates. Ipsum molestiae ..."
```

```ruby
Faker::HTMLIpsum.table                  #=> "<table><thead><tr><th>Voluptatem</th><th>Porro</th><th>Tene
                                        #    tur</th><th>Facilis</th></tr></thead><tbody><tr><td>Numquam<
                                        #    /t..."
                                        #=> "<table><thead><tr><th>Impedit</th><th>Voluptatem</th><th>Qu
                                        #    i</th><th>Est</th></tr></thead><tbody><tr><td>Nihil</td>..."
                                        #=> "<table><thead><tr><th>Iste</th><th>Et</th><th>Sequi</th><th
                                        #    >Et</th></tr></thead><tbody><tr><td>Blanditiis</td>..."
```

```ruby
Faker::HTMLIpsum.fancy_string           #=> "<a href=\"#distinctio\" title=\"Tenetur explicabo\">Velit e
                                        #    st</a> <code>aperiam reiciendis</code> Consectetur aut hic e
                                        #    um quisquam. Dolore aut rerum dolor accusantium ab repellend
                                        #    us magni. Deserunt optio o..."
                                        #=> "Et vel similique ullam accusantium laboriosam. Sit ut ea to
                                        #    tam. Iusto praesentium ut molestiae. Voluptatem laudantium a
                                        #    ut qui adipisci. Est saepe repellendus qui blanditiis volupt
                                        #    ates sed odit ullam. <..."
                                        #=> "Neque et omnis ipsam ad culpa maiores inventore. Laborum cu
                                        #    m est fugit libero repellendus vero. Modi pariatur sunt tene
                                        #    tur soluta inventore ratione. Iste consequuntur quia omnis n
                                        #    umquam excepturi quod ..."
```

## Faker::Name
{: .-one-column}

```ruby
Faker::Name.name                        #=> "Trevion Herman V"
                                        #=> "Aracely Balistreri"
                                        #=> "Daphnee Terry Sr."
```

```ruby
Faker::Name.first_name                  #=> "Aliza"
                                        #=> "Joseph"
                                        #=> "Orland"
```

```ruby
Faker::Name.last_name                   #=> "Hand"
                                        #=> "Macejkovic"
                                        #=> "Heller"
```

```ruby
Faker::Name.prefix                      #=> "Dr."
                                        #=> "Ms."
                                        #=> "Mr."
```

```ruby
Faker::Name.suffix                      #=> "I"
                                        #=> "III"
                                        #=> "DDS"
```

## Faker::PhoneNumber
{: .-one-column}

```ruby
Faker::PhoneNumber.phone_number         #=> "335-364-4549 x430"
                                        #=> "040-278-4021 x753"
                                        #=> "420.645.4382"
```

```ruby
Faker::PhoneNumber.short_phone_number   #=> "473-412-3192"
                                        #=> "353-084-1297"
                                        #=> "080-546-2356"
```

## Faker::Product
{: .-one-column}

```ruby
Faker::Product.brand                    #=> "Trouffeforge"
                                        #=> "VIG"
                                        #=> "NDZ"
```

```ruby
Faker::Product.product_name             #=> "Air HD Viewer"
                                        #=> "HD Kit"
                                        #=> "Air HD Bridge"
```

```ruby
Faker::Product.product                  #=> "Amnix Air HD Tuner"
                                        #=> "Panapod Audible Filter"
                                        #=> "Phuffe Disc Receiver"
```

```ruby
Faker::Product.model                    #=> "I-422"
                                        #=> "J89"
                                        #=> "L6"
```

## Faker::NameCN
{: .-one-column}

```ruby
Faker::NameCN.name                      #=> "姵书虞"
                                        #=> "修男嵇"
                                        #=> "瑜人军"
```

```ruby
Faker::NameCN.last_first                #=> "向坚舜"
                                        #=> "疏骏哲"
                                        #=> "秘合雪"
```

```ruby
Faker::NameCN.first_name                #=> "佑淑"
                                        #=> "燕谦"
                                        #=> "重生"
```

```ruby
Faker::NameCN.last_name                 #=> "释"
                                        #=> "巩"
                                        #=> "麻"
```

## Faker::NameDE
{: .-one-column}

```ruby
Faker::NameDE.name                      #=> "Noelle Schuster"
                                        #=> "Bendix Schmid"
                                        #=> "Azra Neumann"
```

```ruby
Faker::NameDE.first_name                #=> "Victoria"
                                        #=> "Lotta"
                                        #=> "Mads"
```

```ruby
Faker::NameDE.last_name                 #=> "Martin"
                                        #=> "Klein"
                                        #=> "Walter"
```

```ruby
Faker::NameDE.prefix                    #=> "Frau"
                                        #=> "Prof."
                                        #=> "Prof."
```

## Faker::NameJA
{: .-one-column}

```ruby
Faker::NameJA.name                      #=> "飛鳥田部"
                                        #=> "未杉浦"
                                        #=> "功本間"
```

```ruby
Faker::NameJA.last_first                #=> "青木杏子"
                                        #=> "棚原大貴"
                                        #=> "知名翔"
```

```ruby
Faker::NameJA.first_name                #=> "巴"
                                        #=> "浩子"
                                        #=> "沙耶"
```

```ruby
Faker::NameJA.last_name                 #=> "小栗"
                                        #=> "高江洲"
                                        #=> "友寄"
```

## Faker::NameRU
{: .-one-column}

```ruby
Faker::NameRU.name                      #=> "Стелла Карнилина"
                                        #=> "Евгения Мазовская"
                                        #=> "Кузьма Ваиренко"
```

```ruby
Faker::NameRU.last_name                 #=> "Манишева"
                                        #=> "Тюлева"
                                        #=> "Понченко"
```

```ruby
Faker::NameRU.first_name                #=> "Артур"
                                        #=> "Руслана"
                                        #=> "Зинаида"
```

```ruby
Faker::NameRU.patronymic                #=> "Мечеславович"
                                        #=> "Ионович"
                                        #=> "Исаевич"
```

```ruby
Faker::NameRU.name(:male)               #=> "Слежиков Роман Всеволодович"
                                        #=> "Осип Мугрузин"
                                        #=> "Джиджаев Гавриил Леванович"
```

```ruby
Faker::NameRU.name(:female)             #=> "Зиядтдинова Полина Людвиговна"
                                        #=> "Андреева Тереза Арсеновна"
                                        #=> "Дарина Минхазова"
```

## Faker::NameSN
{: .-one-column}

```ruby
Faker::NameSN.name_sn                   #=> "mame Djaly Mbodj"
                                        #=> "Hatab Samy"
                                        #=> "Niouma Dramé"
```

```ruby
Faker::NameSN.name_male                 #=> "serigne Yakou Diagne"
                                        #=> "serigne Sécouba Diagne"
                                        #=> "Sihalébé Badji"
```

```ruby
Faker::NameSN.name_female               #=> "Thiomba Niang"
                                        #=> "adjaratou Kiné Panduppy"
                                        #=> "Nini Gakou"
```

```ruby
Faker::NameSN.first_name_male           #=> "Khoudia"
                                        #=> "Sanokho"
                                        #=> "Diomaye"
```

```ruby
Faker::NameSN.first_name_female         #=> "Assa"
                                        #=> "Sahaba"
                                        #=> "Manthita"
```

```ruby
Faker::NameSN.prefix_male               #=> "eladji"
                                        #=> "eladji"
                                        #=> "serigne"
```

```ruby
Faker::NameSN.prefix_female             #=> "adjaratou"
                                        #=> "adja"
                                        #=> "adja"
```

## Faker::PhoneNumberAU
{: .-one-column}

```ruby
Faker::PhoneNumberAU.phone_number       #=> "0495 539 191"
                                        #=> "(05) 6838 2406"
                                        #=> "0496 013 652"
```

## Faker::PhoneNumberSN
{: .-one-column}

```ruby
Faker::PhoneNumberSN.phone_number       #=> "77-356-93-09"
                                        #=> "33-891-67-75"
                                        #=> "33-886-02-02"
```
