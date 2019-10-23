//
// UI工具类 
//

export const UITools = {

    /**
     * @brief 查找子节点
     * @param root_node 父级节点
     * @param name 子节点名称
     * @return 子节点对象 
     */
    seekChild: function(root_node: cc.Node, name: string): cc.Node
    {
        if(root_node.name == name)
            return root_node;

        let childCount = root_node.childrenCount;
        for (let i = 0; i < childCount; i++)
        {
            let v = this.seekChild(root_node.children[i], name);
            if (v != null)
                return v;
        }

        return null;
    },

    /**
     * @brief 名称格式化
     * @param name 名称
     * @param maxLen 最大长度
     * @return 格式化之后到名称
     */
    formatName: function(name: string, maxLen: number = 6): string
    {
        if (name.length > maxLen)
            return name.substring(0, maxLen) + "...";
        else
            return name;
    },

    /**
     * @brief 数字格式化(四舍五入)
     * @param num 源数字
     * @param digits 小数点保留位数(默认保留2位)
     * @return 格式化之后到数字
     */
    fromatNumber(num: number, digits: number = 2): string 
    {
        let ret = "";
        ret = num.toFixed(digits).toString();

        return ret;
    },

    /**
     * @brief 数字格式化(非四舍五入)
     * @param num 源数字
     * @param digits 小数点保留位数(默认保留2位)
     * @return 格式化之后到数字
     */
    fromatNumber2(num:number, digits:number=2) : string
    {
        let ret = "";
        ret = (Math.floor(num * Math.pow(10,digits)) / Math.pow(10,digits)).toFixed(digits);

        return ret;
    },

    /**
     * @brief 数字格式化
     * @param num 源数字
     * @param digits 小数点保留位数(默认保留6位)
     * @return 格式化之后到数字
     */
   fromatBigNumber(num: number, digits: number = 2): string
   {
        let ret = "";
        if (num < 10000)
        {
            ret = num.toFixed(digits).toString();
        }
        else if (num >= 10000 && num < 100000000)
        {
            num = num / 10000;
            ret = num.toFixed(digits).toString() + "万";
        }
        else if (num >= 100000000)
        {
            num = num / 100000000;
            ret = num.toFixed(digits).toString() + "亿";
        }

        return ret;
   },

   /**
    * @brief 计算贝塞尔曲线控制点
    * @param from 
    * @param to 
    * @param t 
    */
   calculateBezierControlPt(from: cc.Vec2, to: cc.Vec2, t: number)
   {
        //cc.lerp(from, t, end)
   },

    /**
     * 倒计时
     * @param label label控件
     * @param count 倒计时总时长
     * @param cb 回调 
     */
    countDown(label: cc.Label, count: number, cb = () => { }) 
    {
        label.unscheduleAllCallbacks();

        label.string = `${count}`;
        label.node.active = true
        label.schedule(() => {
            count -= 1
            label.string = `${count}`
            if (count <= 0) {
                label.node.active = false
                cb()
            }
        }, 1, count)
    },

    /**
     * @brief 匹配由数字和26个英文字母组成的字符串
     * @param str 源字符串
     */
    regNUmberAndLetter(str:string) :boolean
    {
        let reg = /^[A-Za-z0-9]+$/;
        return reg.test(str);
    },

    /**
     * @brief 替换字符串中指定索引的字符
     * @param str 源字符串
     * @param index 索引
     * @param replacement 替换元素 
     */
    replaceAt(str:string, index:number, replacement:string)
    {
        return str.substr(0,index) + replacement + str.substr(index+replacement.length);
    }
}
