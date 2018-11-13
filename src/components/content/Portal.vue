<template>
<section id="potal">
    <section class="section-wrap">
        <section v-for="section in sections" @click="handleSectionClick(section)" :key="section.sectionid" class="section">
            <h1 class="name">{{ section.sectionname }}</h1>
            <section class="info">{{ section.info }}</section>
        </section>
    </section>
</section>
</template>
<script>
import { Avatar } from "iview";
import { getSection } from "@/api/section";

export default {
  name: "Potal",
  components: {
    Avatar
  },
  computed: {
    sections() {
      return Object.values(this.$store.state.sections);
    }
  },
  created() {
    getSection().then(res => {
      this.$store.commit("updateSections", res.data);
    });
  },
  methods:{
    handleSectionClick(section){
      this.$router.push('/section/'+section.sectionid);
      this.$store.commit('updateBread',{ obj:{
        name: section.sectionname,
        path: '/section/'+section.sectionid
      }, oparator: "forward"})
    }
  }
};
</script>
<style lang="less" scoped>
#potal {
  .section-wrap {
    margin-top: 20px;
    .section {
      display: inline-block;
      width: 490px;
      height: 240px;
      box-shadow: 3px 5px 25px gray;
      padding: 20px;
      margin-bottom: 20px;
      transition: all 0.5s ease;
      &:nth-child(2n + 1) {
        margin-right: 20px;
      }
      &:hover {
        box-shadow: 3px 8px 30px rgb(66, 62, 62);
        cursor: pointer;
      }
    }
  }
}
</style>
