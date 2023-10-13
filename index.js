const { Extension, type, api } = require('clipcc-extension');

class MyExtension extends Extension {
    whatPlanIsUsedWhenHitError = "b";
    capturedError = undefined;
    logError(e) {
        //错误处理相关实现借鉴自：github.com/bddjr/clipcc-extension-nhjrToolBox/blob/1fb1859cd3ac44cf9ceade46b40adde2a24153cb/index.js#L10
        console.error(e);
        this.capturedError = String(e);
        if (this.whatPlanIsUsedWhenHitError === 'a') {
            return String(e);
        }
        return 0;
    }
    //用于处理用户输入的图片 URL。
    imageURLcleaner() {

    }
    onInit() {

        //分类 "mediaSession" ：
        //welcome：“杂项”
        api.addCategory({
            categoryId: 'jexjws.mediasession.category.welcome',
            messageId: 'jexjws.mediasession.category.welcome',
            color: '#582396'
        });
        //积木 "mediaSession 是否可用" ：
        api.addBlock({
            opcode: 'jexjws.mediasession.v1.can_use_mediaSession',
            messageId: 'jexjws.mediasession.block.can_use_mediaSession',
            categoryId: 'jexjws.mediasession.category.welcome',
            type: type.BlockType.BOOLEAN,
            function: () => {
                try {
                    return ("mediaSession" in navigator);
                } catch (e) {
                    return this.logError(e)
                }
            }
        })
        /*积木 "当执行出错时：" ：
        直接通过积木块返回报错信息（易于调试）+ 记录报错信息到 "mediaSession 报错信息" 积木中 + console报错
        默认：积木块仅返回空白信息 + 记录报错信息到 "mediaSession 报错信息" 积木中 + console报错
        */
        api.addBlock({
            opcode: 'jexjws.mediasession.v1.do_what_when_hit_error',
            messageId: 'jexjws.mediasession.block.do_what_when_hit_error',
            categoryId: 'jexjws.mediasession.category.welcome',
            type: type.BlockType.COMMAND,
            field: true,
            param: {
                what_plan: {
                    type: type.ParameterType.STRING,
                    menu: [{
                        messageId: 'jexjws.mediasession.menu.do_what_when_hit_error.planA',
                        value: 'a'
                    }, {
                        messageId: 'jexjws.mediasession.menu.do_what_when_hit_error.planB',
                        value: 'b'
                    }],
                    default: 'b'
                }
            },
            function: () => {
                try {
                    throw "test";
                    whatPlanIsUsedWhenHitError = args.what_plan;
                }
                catch (e) { return this.logError(e); }
            }
        })
        //积木 "mediaSession 是否可用" ：



        //分类 "媒体元数据" ：
        api.addCategory({
            categoryId: 'jexjws.mediasession.category.media_metadata',
            messageId: 'jexjws.mediasession.category.media_metadata',
            color: '#582396'
        });
        //积木 “初始化：媒体元数据”
        api.addBlock({
            opcode: 'jexjws.mediasession.v1.set_media_metadata',
            type: type.BlockType.COMMAND,
            messageId: 'jexjws.mediasession.block.reset_media_metadata',
            categoryId: 'jexjws.mediasession.category.media_metadata',
            function: () => {
                try {
                    navigator.mediaSession.metadata = new MediaMetadata();
                } catch (e) {
                    return this.logError(e);
                }

            }
        })
        //积木 "设定媒体元数据中的 [key] 为 [value] " ：
        api.addBlock({
            opcode: 'jexjws.mediasession.v1.set_media_metadata',
            type: type.BlockType.COMMAND,
            messageId: 'jexjws.mediasession.block.set_media_metadata',
            categoryId: 'jexjws.mediasession.category.media_metadata',
            param: {
                key: {
                    type: type.ParameterType.STRING,
                    menu: [{
                        messageId: 'jexjws.mediasession.menu.title',
                        value: 'title'
                    }, {
                        messageId: 'jexjws.mediasession.menu.artist',
                        value: 'artist'
                    }, {
                        messageId: 'jexjws.mediasession.menu.album',
                        value: 'album'
                    }],
                    default: 'title'
                },
                value: {
                    type: type.ParameterType.STRING,
                    default: '  '
                }
            },
            function: (args) => 'Hello, ClipCC!' + String(JSON.stringify(args) + this.whatPlanIsUsedWhenHitError)
        });
    }
    onUninit() {
        api.removeCategory('jexjws.mediasession.category.media_metadata');
        api.removeCategory('jexjws.mediasession.category.compatibility_test');
    }
}


module.exports = MyExtension;
