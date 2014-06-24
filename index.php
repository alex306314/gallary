<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>图片空间</title>

  <link href="css/seller-global-min.css" type="text/css" rel="stylesheet">
  <link href="css/common.css" type="text/css" rel="stylesheet">
  <!--link href="css/zTreeStyle/zTreeStyle.css" type="text/css" rel="stylesheet"-->
  <link href="css/manage.css" type="text/css" rel="stylesheet">
  <script data-main="js/app/main.js" src="js/lib/require.min.js"></script>

</head>
<body>

<div id="wrap">

  <div class="top-pannel">
    <?php include "nav.php"; ?>
  </div><!--top pannel-->

  <div class="left-pannel">
    <div class="tree-container">
      <h2 class="head">图片目录</h2>
      <div class="tree-handle">
        <div class="search-tree">
          <input id="J_search_folder" placeholder="按文件夹名称实时搜索" type="search">
          <input class="search-btn" type="button">
        </div>
      </div>
      <div id="J_MainTreeRoom" class="treeRoom">
        <ul id="J_MainTree" class="ztree"></ul>
      </div>
      <div class="rightButton contextMenu" id="tree_menu">
        <ul>
          <li class="tree-add" ><span class="icon"></span><span>新建</span></li>
          <li class="tree-move" ><span class="icon"></span><span>移动</span></li>
          <li class="tree-rename" ><span class="icon"></span><span>重命名</span></li>
          <li class="tree-delete"><span class="icon"></span><span>删除</span></li>
        </ul>
      </div>
    </div>
  </div><!--left-pannel-->

  <div class="main-pannel">
    <div class="all-control-bar">
      <ol class="breadcrumb" id="J_Crumbs">
        <li class="active home"><i class="icon"></i>我的图片</li>
      </ol>
      <div class="control">
        <div class="control-buttons" id="J_UpAndNew">
          <button data-spm-anchor-id="a1z28.7093685.0.d4916817" type="button" class="btn btn-primary up"
                  data-spm-click="gostr=/tbimage;locaid=d4916817">
            <span class="up-icon"></span>上传图片
          </button>
          <button type="button" class="btn btn-default new" data-spm-click="gostr=/tbimage;locaid=d4916821">
            <span class="new-icon"></span>新建文件夹
          </button>
          <a type="button" href="" class="btn btn-default">
            <span class="recycle-icon"></span>回收站</a>
        </div>
        <div class="search" id="J_SearForm">
          <div class="search-form">
            <input class="form-control search-input" placeholder="按文件夹名称/图片名称搜索" type="text">
            <input class="search-btn" data-spm-click="gostr=/tbimage;locaid=d4916829" type="button">
          </div>
          <div class="spec-search">
            <a href="javascript:;" data-spm-click="gostr=/tbimage;locaid=d4916833">高级搜索</a>
            <!--begin-->
            <form style="display: none;" class="spec-search-form form-horizontal" id="J_SpecForm">
              <s class="arrow icon"></s>
              <fieldset>
                <legend>高级搜索</legend>
                <button type="button" class="close">×</button>
                <div class="control-group">
                  <span class="alert alert-warning">提示：如果您已经勾选了只显示图片，搜索结果将不会出现文件夹</span>
                </div>
                <div class="control-group">
                  <label class="control-label" for="J_SsType">搜索类型: </label>

                  <div class="controls">
                    <select class="form-control" id="J_SsType">
                      <optgroup label="类别">
                        <option selected="selected" value="1">文件夹/图片名称</option>
                        <option value="2">宝贝名称</option>
                      </optgroup>
                      <optgroup label="客户端">
                        <option value="3">手机图片</option>
                        <option value="4">PC 图片</option>
                      </optgroup>
                      <optgroup label="引用关系">
                        <option value="2">宝贝引用的图片</option>
                        <option value="6">店铺引用的图片</option>
                        <option value="7">未引用</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label" for="J_SsKey">关键字</label>

                  <div class="controls">
                    <input class="key-input" name="key" id="J_SsKey" placeholder="请输入图片或者文件夹名称" type="text"></div>
                </div>
                <div class="control-group" id="J_SsTime">
                  <label class="control-label" for="">上传日期</label>

                  <div class="controls">
                    <input class="time-input" name="start" type="text">
                    到
                    <input class="time-input" name="end" type="text">
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls">
                    <button class="btn btn-primary search">搜索</button>
                  </div>
                </div>
              </fieldset>
            </form>
            <!-- end -->
          </div>
        </div>
      </div>
    </div>
    <div class="page-bar clearfix">
      <div class="select-bar clearfix" id="J_SelectBar">
        <div class="select-all"><input id="J_SelectAll" title="全选/反选" type="checkbox"></div>
        <div class="selected-msg"></div>
        <ul class="controlBar selected-controls" id="J_ControlBar"></ul>
        <ul class="right-menu selected-controls" id="J_PicRightmenu"></ul>
      </div>
      <div style="display: none;" class="sort-bar" id="J_SortBar">
        <div class="is-show-folder">
          <label>
            <input id="J_IsShowFolder" type="checkbox">只显示图片
          </label>
        </div>

        <div class="where-used my-dropdown">
          <div class="drop-label">图片类型:</div>
          <div class="dropdown" id="J_WhereUsed">
            <a class="dropdown-toggle" data-type="0"><span>全部</span><i class="drop-icon"></i></a>
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
              <li role="presentation">
                <a role="menuitem" data-type="0" class="all">全部</a>
              </li>
              <li role="presentation">
                <a role="menuitem" data-type="1" class="qouted">手机端</a>
              </li>
              <li role="presentation">
                <a role="menuitem" data-type="2" class="noqouted">PC 端</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="sort my-dropdown">
          <div class="drop-label">排序:</div>
          <div class="dropdown" id="J_Sort">
            <a class="dropdown-toggle down" data-type="0">时间</a>
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
              <li role="presentation">
                <a role="menuitem" data-type="0" class="time down" data-spm-click="gostr=/tbimage;locaid=d4916857">时间</a>
              </li>
              <li role="presentation">
                <a role="menuitem" data-type="1" class="time up" data-spm-click="gostr=/tbimage;locaid=d4916853">时间</a>
              </li>
              <li role="presentation">
                <a role="menuitem" data-type="2" class="big down" data-spm-click="gostr=/tbimage;locaid=d4916865">大小</a>
              </li>
              <li role="presentation">
                <a role="menuitem" data-type="3" class="big up" data-spm-click="gostr=/tbimage;locaid=d4916861">大小</a>
              </li>
              <li role="presentation">
                <a role="menuitem" data-type="6" class="name down" data-spm-click="gostr=/tbimage;locaid=d4916869">名称</a>
              </li>
              <li role="presentation">
                <a role="menuitem" data-type="7" class="name up" data-spm-click="gostr=/tbimage;locaid=d4916873">名称</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn-group show-type">
          <button type="button" id="J_ShowList" class="btn btn-default" title="列表模式" >
            <span class="list icon"></span></button>
          <button type="button" id="J_ShowPic" class="btn btn-default"
                  title="大图模式"><span class="big-pic icon active"></span>
          </button>
        </div>
        <div class="page-msg" id="J_TopPagination"></div>
      </div>
    </div>

    <div class="pic-container" id="J_PicContainer">
      <div id="J_Picture" class="clearfix ui-selectable">
        <div class="list-head clearfix">
          <div class="span1">名称</div>
          <div class="span2">类型</div>
          <div class="span2">尺寸</div>
          <div class="span2">大小</div>
          <div class="span2">是否引用</div>
          <div class="span2">更新时间</div>
        </div>
      </div>
    </div>

    <!--页脚 分页-->
    <div class="page-footer" id="J_PageFooter"></div>


  </div><!--main pannel-->

  <!--modal dialog-->
  <div style="display: none;" class="modal fade" id="J_Modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">×</button>
          <h3 class="modal-title">移动到</h3>

          <div class="modal-subTitle"></div>
        </div>
        <span style="display: none;" class="modal-msg label">Success</span>

        <div class="modal-body">tst</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="J_ModalSure" data-type="">确定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div><!--modal dialog end-->
  <div class="modal-backdrop fade" style="display: none"></div>


</div><!--#wrap-->


<script type="text/template" id="tpl_page_footer">
<div class="pager-container clearfix">
    <div id="J_Pager" class="pull-left">
        <div class="pagination pull-left"></div>
        <div class="pages-number pull-left"></div>
    </div>
    <div class="goto-page pull-left">
        <form role="form" class="form-inline">
            <div class="form-group">
                <label for="J_GotoPageNumber" class="control-label">到第</label>
                <input type="text" id="J_GotoPageNumber" class="form-control">
                <label for="J_GotoPageNumber" class="control-label">页</label>
            </div>
            <button id="J_GotoPage" class="btn btn-default">跳转</button>
        </form>
    </div>
</div>
</script>

<!--sample template for folder-->
<script type="text/template" id="itemTemplateFol">
  <div class="folder">
    <div class="base-msg">
      <div class="folder-msg">
        <div class="without-img"></div>
        <!--<div class="file-num clearfix">
          <div class="folder-number">222</div>
          <div class="img-number">222</div>
        </div>-->
      </div>
      <div class="folder-name" title="[%=name%]">[%=name%]</div>
      <input type="text" value="[%=name%]"/>
    </div>
    <div class="out">文件夹</div>
    <div class="out"></div>
    <div class="out"></div>
    <div class="out"></div>
    <div class="out">[%=time%]</div>
  </div>
</script>

<!--sample template for picture-->
<script type="text/template" id="itemTemplatePic">
  <div class="image">
    <div class="base-msg">
      <div class="img-container"><img src="[%=url%]" alt=""></div>
      <div class="img-name" title="[%=name%]">[%=name%]</div>
      <input type="text" value="[%=name%]"/>
      [%if(isref==1){%]
      <div class="qout icon"></div>
      [%}%]
      [%if(clientType==1){%]
      <div class="phone icon"></div>
      [%}%]
      <ul class="handle clearfix">
        <li class="copy-pic" data-clipboard-text="[%=ecode%],pic" title="复制图片"><span class="icon"></span></li>
      <li class="copy-link" data-clipboard-text="[%=eurl%],link" title="复制链接"><span class="icon"></span></li>
      <li class="copy-code" data-clipboard-text="[%=ecode%],code" title="复制代码"><span class="icon"></span></li>
    </ul>
    </div>
    <div class="out">[%=suffix%]</div>
    <div class="out">[%=px%]</div>
    <div class="out">[%=size%]</div>
    <div class="out isref">否</div>
    <div class="out">[%=time%]</div>
    [%if(freezed){%]
    <div class="freezing-cover">
    <div class="cover"></div>
    <div class="title">图片已冻结</div>
      [%if(why){%]
      <div class="why">[%=why%]</div>
      [%}%]
    </div>
    [%}%]
  </div>
</script>

<!--控制条模板-->
<script type="text/template" id="tpl_control_bar">
  <a href="javascript:;"><i class="icon"></i>[%=name%]<span class="line"></span></a>
</script>

<script type="text/template" id="tpl_picright_menu">
  [%if(replace){%]<li class="replace"><a href="javascript:;"><i class="icon"></i>替换</a></li>[%}%]
  [%if(copy){%]<li class="copy"><a href="javascript:;"><i class="icon"></i>多图复制</a></li>[%}%]
  [%if(move){%]<li class="move"><a href="javascript:;"><i class="icon"></i>移动</a></li>[%}%]
  [%if(rename){%]<li class="rename"><a href="javascript:;"><i class="icon"></i>重命名</a></li>[%}%]
  [%if(checkSee){%]<li class="check-see"><a href="javascript:;"><i class="icon"></i>查看引用</a></li>[%}%]
  [%if(edit){%]<li class="edit"><a href="javascript:;"><i class="icon"></i>编辑</a></li>[%}%]
  [%if(toPhone){%]<li class="tophone"><a href="javascript:;"><i class="icon"></i>适配手机</a></li>[%}%]
  [%if(delete){%]<li class="delete"><a href="javascript:;"><i class="icon"></i>删除</a></li>[%}%]
  [%if(upFile){%]<li class="upfile"><a href="javascript:;"><i class="icon"></i>上传文件</a></li>[%}%]
  [%if(newFolder){%]<li class="newfolder"><a href="javascript:;"><i class="icon"></i>新建文件夹</a></li>[%}%]
</script>



</body>
</html>