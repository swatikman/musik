import { library } from '@fortawesome/fontawesome-svg-core'
import {faAddressCard, faCoffee, faEllipsisV, faPlay} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from "vue";

library.add(faCoffee, faEllipsisV, faAddressCard, faPlay);

Vue.component('font-awesome-icon', FontAwesomeIcon);
