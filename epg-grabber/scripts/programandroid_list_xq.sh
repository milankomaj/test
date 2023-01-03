#!/bin/bash

for XPath in {'//a/@id','//n','//o','//p','//a/@k'}
do
echo "${XPath}"
version=$(date +'%s%N')
echo $version

curl -X GET \
  --no-progress-meter \
  --url "https://programandroid.365dni.cz/android/v5-tv.php?locale=sk" \
| ./xq -x ${XPath} > $(echo $version).csv
done

paste -d ',' *.csv > programandroid.tsv
sed -i '/České\|Slovenské/!d' programandroid.tsv
sed -i '/Ostatné/d' programandroid.tsv

awk -F ',' '{print "    <channel lang=\"cz\" xmltv_id=\"programandroid-"$1"\""" site_id=\""$1"\""" logo=\"https://www.sms.cz/kategorie/televize/bmp/loga/velka/"$3"\""">"$2"</channel>"}' programandroid.tsv  > sites/programandroid.channels.xml
sed -i 1i"<?xml version=\"1.0\" encoding=\"UTF-8\"?>" sites/programandroid.channels.xml
sed -i 2i"<site site=\"programandroid.365dni.cz\">" sites/programandroid.channels.xml
sed -i 3i"\ \ <channels>" sites/programandroid.channels.xml
echo "  </channels>" >> sites/programandroid.channels.xml
echo "</site>" >> sites/programandroid.channels.xml
awk -F ',' '{print "programandroid-"$1","$1","$2","$5","$3}' programandroid.tsv | sort -t, -k3 > csv/programandroid.channels.csv

sed -i 1i"xmltv_id,site_id,name,channelNumber,logoUrl" csv/programandroid.channels.csv
