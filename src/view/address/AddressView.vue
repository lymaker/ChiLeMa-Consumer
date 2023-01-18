<template>
  <div class="container">
    <div id="map-container" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {ipLocation} from '@/api/map.js';
import {nanoid} from 'nanoid';
import {useAddressStore} from '@/store/address.js';

const addressStore = useAddressStore();

let map = null;
let marker = null;
let centerMarkId = null;
const mapOptions = {
  zoom: 17.5,
  showControl: false,
  offset: {
    y: -250
  }
};

onMounted(initMap);

async function initMap() {
  map = new TMap.Map('map-container', mapOptions);
  marker = new TMap.MultiMarker({map});
  const {data: {result: {ad_info, location}}} = await ipLocation();
  updateCenter(ad_info.city, location);
}

/**
 * 更新中心点
 *
 * @param city
 * @param location
 */
function updateCenter(city, location) {
  const id = nanoid();
  const position = new TMap.LatLng(location.lat, location.lng);
  map.setCenter(position);
  marker.add([{id, position}]);
  marker.remove(centerMarkId);
  centerMarkId = id;
  addressStore.location = location;
  addressStore.city = city;
}

addressStore.$subscribe((mutation, state) => {
  updateCenter(state.city, state.location);
});
</script>

<style lang="less" scoped>
@import "@/index.less";

.container {
  height: 100vh;

  #map-container {
    height: 100%;
  }

  main {
    position: absolute;
    inset: 0;
    height: 100%;
    padding: @basic-view-padding-y @basic-view-padding-x;
    box-sizing: border-box;
  }
}
</style>