#!/bin/bash

for f in public/themes/*
do
	if [ -e ./$f/gulpfile.js ]
	then
		echo $f
		npm i --prefix $f
		npm run gulp --prefix $f
	fi
done	

for f in public/admin/*
do
	if [ -e ./$f/gulpfile.js ]
	then
		echo $f
		npm i --prefix $f
		npm run gulp --prefix $f
	fi
done


# move all themes font folder to common fonts folder to decrease zip size
find public/admin/*/css/*.css -type f -exec  sed -i -E 's$([''"])../fonts/$\1../../../fonts/$g' {} +;
find public/themes/*/css/*.css -type f -exec  sed -i -E 's$([''"])../fonts/$\1../../../fonts/$g' {} +;

rm -rvf public/js/libs/tinymce-dist/plugins/*/index.js  public/js/libs/tinymce-dist/plugins/*/plugin.js

rm -rf storage/compiled-templates/app_* storage/compiled-templates/admin_* storage/cache/* storage/logs/* storage/backup/* public/page-cache/* public/assets-cache/* public/image-cache/* public/themes/*/backup/* latest.zip 

#zip -9 -X -r latest.zip ./ -x '*/node_modules/*' -x 'tests/*' -x 'test.php' -x 'phpunit.xml' -x '.git/*'  -x '/config/db.php'  -x '*/src/*' -x '*/scss/*' -x '*/resources/svg/*/*/*.svg' 
