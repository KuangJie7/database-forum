import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        sections: {},
        breadArr: [{
            name: "导航",
            path: "/section"
        }],
    },
    mutations: {
        updateUser(state, user){
            state.user = user;
        },
        updateSections(state, sections){
            const allSections = {}
            sections.forEach(element => {
                allSections[element.sectionid] = element
            });
            state.sections = allSections;
        },
        updateBread(state,{ obj, oparator }){
            if(oparator === "forward"){
                state.breadArr.push(obj)
            }else{
                state.breadArr = state.breadArr.slice(0, obj.length);
            }
        }
    }
})