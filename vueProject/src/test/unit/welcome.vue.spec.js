import Vue from 'vue';
import welcome from '../../component/welcom.vue';
import ElementUI from "element-ui";

Vue.use(ElementUI);



describe("welcom.vue component unit test",function() {
    it('sets the correct default data', () => {
        expect(typeof welcome.data).toBe('function');
        const defaultData = welcome.data();
        expect(defaultData.name).toBe('world!');
      })
})