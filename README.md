Gallary
=======

Based on jquery+backbone+ejs+require application for folders and images handle by explore

---

显示处理流程
==========
1. 初始化请求服务器获取所有的文件夹数据生成左侧目录树
2. 初始化结束 默认请求id为0的顶级目录里所有数据 并生成右侧主体内容


item.type 属性值:
----------------
* 1 => folder
* 2 => image



#taobao

##左侧
图片目录浏览/编辑

* 新建
* 移动
* 重命名
* 删除

##右侧
1. 选择文件夹
    * 移动
    * 重命名
    * 删除
2. 选择图片文件
    * 替换
    * 移动
    * 重命名
    * 编辑
    * 适配手机
    * 删除
3. 当前目录 上传图片  新建文件夹



app

    infoBox  信息提示框
    treeRoom 左侧目录树

treeRoom.render() 从服务器获取数据 成功后
