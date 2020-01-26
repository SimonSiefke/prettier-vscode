<!-- TODO
ask user if he/she
"Do you want to enable format on save (recommended)?"
[Yes] [Maybe Later]


and dont ask if it is already enabled or if the user has already been asked
 -->

<!-- TODO bug
unicode regex and cjk regex are unnecessarily bundled inside server chunk


 -->

<!-- TODO maybe don't include prettier in bundle and after install run npm i -g prettier
then use the global prettier version for formatting or the local version of prettier if there is one

 -->

 <!-- TODO dont throw error on invalid json code -->

<!-- TODO bug
why are there no spaces around braces

import {a} from 'a'

instead of

import { a } from 'a'

 -->

<!-- TODO bug with dynamic config required from node modules -->

<!-- TODO test if it works when package.json is invalid -->

<!-- TODO test if it works when changing prettierrc -->

<!-- TODO support virtual file systems, e.g. memfs -->
