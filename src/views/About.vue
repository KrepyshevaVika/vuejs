<template>
  <div class="main-component">
    <div class="inner-main">
        <button type="button" class="btn btn-success" v-on:click="say('hi')">+</button>  

        <ul class="inner-ul" v-for="elem in nodes">
          <li is="li-item" class="li" v-bind:elem="elem" 
                  v-on:handleToLoad="handleToLoad(elem)"></li>

          <ul class="inner-ul" v-if="(elem.children && elem.children.length > 0)">
            <li is="li-item" class="li" v-for="el in elem.children" v-bind:elem="el" v-on:handleToLoad="handleToLoad(elem)"></li>
          </ul> 
        </ul>   
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import liItem from '@/components/LiItem.vue';

export default {
  created: function () {
    this.getTop();
  },
  components: {
    liItem
  },
  computed: mapState([
    'nodes'
  ]),
  methods: {
    ...mapActions([
      'getTop',
      'getChild'
    ]),
    say: function (message) {
      alert(message)
    },
    handleToLoad: function(elem) {
      if (elem.count_child > 0) {

        if(!elem.id) return;
       // this.handleOpenInfo(id);
       console.log(this.nodes);
        let tmpNodes = this.nodes.slice();
        let target = this.targetElem(tmpNodes, elem.id);
        if (target) {
          delete target.children;
          //this.props.deleteChild(this.props.nodes);
        } else 
          this.getChild(elem.id);

      }else this.say('war');
    },
    targetElem: function(menuNodes, id) { 
      for (let elem of menuNodes) {
        if ((elem.id === id) && (elem.children && elem.children.length > 0)) {
          return elem;    
        }
        if (elem.children && elem.children.length > 0) {
          let tmp = this.targetElem(elem.children, id);
          if(tmp)
            return tmp;
        }     
      }
    }

  }
}
</script>

<style scoped lang="less">
.inner-main {
  width: 300px;
  outline: 2px solid  gray;
  padding: 10px;
}

li {
  list-style-type: none;
}

.li {
  cursor: pointer;
}

.item:focus { 
  outline: 2px dashed green; 
}

.line { 
  outline: 2px dashed green; 
}

.item{
  display: flex;
  align-items: center;
}

.item > div:first-child{
  padding-right: 10px;
  font-size: 15px;
}

.item > div:first-child{
  padding-right: 10px;
  font-size: 15px;
}

.item .icon{
  transition: transform .5s ease, color .5s ease;
  font-size: 40px;
}  

.item .icon.active{
  transform: rotate(90deg);
}  

.item .icon.disable{
  cursor: default;
  color: white;
}  

.item:hover .btnCanOpen{
  display: block;
}

.item .btn{
  display: none; 
  margin-right: 5px;
  border-radius: 5px !important;
} 

.hidden {
  display: none;
} 

.main-component {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.inner-ul {
  height:350px;
  overflow: auto;
  padding: 10px 10px 0px 20px;
}

.text {
  white-space: pre;
  margin-right: 10px;
}
</style>