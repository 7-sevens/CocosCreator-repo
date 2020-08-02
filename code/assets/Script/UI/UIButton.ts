//
// @brief: 按钮扩展封装
//

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIButton extends cc.Component {

    @property
    onLongWaitTime      :number = 1.0;  // 长按等待时间

    @property
    onPresssWaitTime    :number = 0.5;  // 多次点击事件触发间隔

    @property
    onPresssScale       :number = 0.9;  // 点击缩放比例

    //
    private ui_bg       :cc.Node = null;
    private ui_icon     :cc.Node = null;

    private btn_component   :cc.Button = null;
    private pre_clicktime   :number = null;
    private click_event_handler :cc.Component.EventHandler[] = new Array();


    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    onLoad() 
    {
        this.ui_bg = this.node.getChildByName('bg');
        this.ui_icon = this.node.getChildByName('icon');

        this.btn_component = this.getComponent(cc.Button);
        if (this.btn_component == null) 
        {
            this.btn_component = this.addComponent(cc.Button);
            this.btn_component.interactable = true;
            this.btn_component.enableAutoGrayEffect = true;
            
            this.btn_component.zoomScale = 0.9;
            this.btn_component.duration = 0.1;
            this.btn_component.transition = cc.Button.Transition.SCALE;
        }

        this.registerNodeEvent();
    }

    onDestroy()
    {
        this.unegisterNodeEvent();
    }

    registerNodeEvent()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    unegisterNodeEvent()
    {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    /**
     * @brief 节点绑定button点击事件
     * @param target 事件触发节点
     * @param compName 节点组件名
     * @param handlerName 事件回调
     * @param eventData 自定义数据
     */
    addClickEvent(target:cc.Node, compName:string, handlerName:string, eventData?:string)
    {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = target;
        clickEventHandler.component = compName;
        clickEventHandler.handler = handlerName;
        clickEventHandler.customEventData = eventData;
        this.click_event_handler.push(clickEventHandler);
    }

    /**
     * @brief 按钮是否可见
     */
    set btnActive(btnActive:boolean)
    {
        this.node.active = btnActive;
    }

    set btnInteractable(interactable:boolean)
    {
        this.btn_component.interactable = interactable;
        if (interactable)
            this.ui_bg.getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
        else
            this.ui_bg.getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
    }

    /////////////////////////////////////////////////////////////////////////
    // 内部私有方法
    _onTouchBegan(event)
    {

    }

    _onTouchMove(event)
    {
        
    }

    _onTouchEnded(event)
    {
        if (!this.node.active || !this.btn_component.interactable)
            return;
        
        let current_clicktime = (new Date()).valueOf();
        if (current_clicktime - this.pre_clicktime < this.onPresssWaitTime * 1000)
            return;
        
        cc.Component.EventHandler.emitEvents(this.click_event_handler, event);
        this.node.emit('click', this);
        this.pre_clicktime = current_clicktime;
    }

    _onTouchCancel(event)
    {
        
    }
}
