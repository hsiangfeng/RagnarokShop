<<<<<<< HEAD
<template lang="pug">
  .container
    loading(:active.sync='isLoading', :opacity='1')
      img(src='@/assets/loading.gif', alt='', srcset='')
      vue-typed-js.justify-content-center.align-items-center(:strings="['波利加載中…']")
        small.font-weight-normal.typing
    .text-right.my-2
      button.btn.btn-ro.text-white(type='button', @click="openModel('new')")
        font-awesome-icon(:icon="['fas', 'plus']")
          | 新增產品
    .card-columns
      .card(v-for='item in products', :key='item.id')
        a(:href='item.imageUrl', target='_black')
          img.card-img-top(:src='item.imageUrl', v-if='item.imageUrl')
        .card-body
          span.badge.badge-secondary.float-right {{item.category}}
          h5.card-title
            | {{item.title}}
          p.card-text
            | {{item.content}}
          ul.list-group.list-group-flush
            li.list-group-item.card-text
              span.text-secondary {{item.description}}
            li.list-group-item
              .text-danger.text-right
                | 原價：
                del {{item.origin_price | currency}}
              .text-success.text-right
                | 特價：{{item.price | currency}}
            li.list-group-item.text-right
              | 單位：{{item.unit}}
              span.text-secondary.small (1組/個)
            li.list-group-item.text-center.text-white(:class="{'bg-success': item.is_enabled,\
            'bg-danger': !item.is_enabled }")
              | 產品狀態：
              span(v-if='item.is_enabled') 已開啟
              span(v-else='') 未啟用
            li.list-group-item
              button.btn.btn-outline-ro.btn-block(@click="openModel('edit', item)")
                font-awesome-icon(:icon="['fas', 'edit']")
                  | 編輯
              button.btn.btn-outline-danger.btn-block(@click="openModel('delete', item)")
                font-awesome-icon(:icon="['fas', 'trash-alt']")
                  | 刪除
    paginationcomponents(:paginationservice='pagination', v-on:pageservice='getProducts')
      #productsModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
        .modal-dialog.modal-lg(role='document')
          .modal-content.border-0
            .modal-header.bg-dark.text-white
              h5#exampleModalLabel.modal-title
                span {{modelStatus}}
              button.close(type='button', data-dismiss='modal', aria-label='Close')
                span(aria-hidden='true') ×
            .modal-body
              .row
                .col-sm-4
                  .form-group
                    label(for='image') 輸入圖片網址
                    input#image.form-control(type='text', placeholder='請輸入圖片連結', v-model='tempProducts.imageUrl')
                  .form-group
                    label(for='customFile')
                      | 或 上傳圖片
                      font-awesome-icon(:icon="['fas','spinner']", spin='', v-if='status.fileUploading')
                        img(src='@/assets/img/yJFR7SP.gif', alt='努力上傳中', v-if='status.fileUploading', width='25px')
                    input#customFile.form-control(type='file', ref='files', @change='updataProductsImg()')
                  img.img-fluid(img='https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80', alt='', :src='tempProducts.imageUrl')
                .col-sm-8
                  .form-group
                    label(for='title') 標題
                    input#title.form-control(type='text', placeholder='請輸入標題', v-model='tempProducts.title')
                  .form-row
                    .form-group.col-md-6
                      label(for='category') 分類
                      select#category.form-control(v-model='tempProducts.category')
                        option(value='', disabled='') --請選擇分類--
                        option(value='熱門商品') 熱門商品
                        option(value='組合優惠') 組合優惠
                        option(value='MVP武器') MVP武器
                        option(value='MVP防具') MVP防具
                        option(value='MVP卡片') MVP卡片
                        option(value='其他') 其他
                    .form-group.col-md-6
                      label(for='price') 單位
                      select#unit.form-control(v-model='tempProducts.unit')
                        option(value='', disabled='') --請選擇單位--
                        option(value='個') 個
                        option(value='組') 組
                        option(value='其他') 其他
                  .form-row
                    .form-group.col-md-6
                      label(for='origin_price') 原價
                      input#origin_price.form-control(type='number', placeholder='請輸入原價', v-model='tempProducts.origin_price')
                    .form-group.col-md-6
                      label(for='price') 售價
                      input#price.form-control(type='number', placeholder='請輸入售價', v-model='tempProducts.price')
                  hr
                  .form-group
                    label(for='description') 產品描述
                    textarea#description.form-control(type='text', placeholder='請輸入產品描述', v-model='tempProducts.description')
                  .form-group
                    label(for='content') 說明內容
                    textarea#content.form-control(type='text', placeholder='請輸入產品說明內容', v-model='tempProducts.content')
                  .form-group
                    .form-check
                      input#is_enabled.form-check-input(type='checkbox', v-model='tempProducts.is_enabled', :true-value='1', :false-value='0')
                      label.form-check-label(for='is_enabled')
                        | 是否啟用
            .modal-footer
              button.btn.btn-outline-secondary(type='button', data-dismiss='modal') 取消
              button.btn.btn-primary(type='button', @click='updataProducts()')
                font-awesome-icon(:icon="['fas', 'spinner']", v-if='status.loadingItem', spin='')
                  | 確認
      #deleteProductsModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
        .modal-dialog(role='document')
          .modal-content.border-0
            .modal-header.bg-danger.text-white
              h5#exampleModalLabel.modal-title
                span {{modelTitle}}
              button.close(type='button', data-dismiss='modal', aria-label='Close')
                span(aria-hidden='true') ×
            .modal-body
              | 是否刪除
              strong.text-danger {{ tempProducts.title }}
              |  商品(刪除後將無法恢復)。
            .modal-footer
              button.btn.btn-outline-secondary(type='button', data-dismiss='modal') 取消
              button.btn.btn-danger(type='button', @click='deleProducts')
                font-awesome-icon(:icon="['fas', 'spinner']", v-if='status.loadingItem', spin='')
                  | 確認刪除
=======
<template>
  <div class="container">
    <loading :active.sync="isLoading"
    :opacity="1">
      <img src="@/assets/loading.gif" alt="" srcset="">
      <vue-typed-js :strings="['波利加載中…']"
      class="justify-content-center align-items-center">
        <small class="font-weight-normal typing">
        </small>
      </vue-typed-js>
    </loading>
    <div class="text-right my-2">
      <button type="button"
      class="btn btn-ro text-white"
      @click="openModel('new')">
        <font-awesome-icon :icon="['fas', 'plus']"/> 新增產品
      </button>
    </div>
    <div class="card-columns">
      <div class="card" v-for="item in products" :key="item.id">
        <a :href="item.imageUrl" target="_black">
          <img class="card-img-top" :src="item.imageUrl" v-if="item.imageUrl">
          <img class="card-img-top" :src="item.image" v-if="item.image">
        </a>
        <div class="card-body">
          <span class="badge badge-secondary float-right">{{item.category}}</span>
          <h5 class="card-title">
            {{item.title}}
          </h5>
          <p class="card-text">
            {{item.content}}
          </p>
           <ul class="list-group list-group-flush">
            <li class="list-group-item card-text">
              <span class="text-secondary">{{item.description}}</span>
            </li>
            <li class="list-group-item">
              <div class="text-danger text-right">
                原價：<del>{{item.origin_price | currency}}</del>
              </div>
              <div class="text-success text-right">
                特價：{{item.price | currency}}
              </div>
            </li>
            <li class="list-group-item text-right">
              單位：{{item.unit}}
              <span class="text-secondary small">(1組/個)</span>
              </li>
            <li class="list-group-item text-center text-white"
            :class="{'bg-success': item.is_enabled,
            'bg-danger': !item.is_enabled }">
              產品狀態：
              <span v-if="item.is_enabled">已開啟</span>
              <span v-else>未啟用</span>
            </li>
            <li class="list-group-item">
              <button class="btn btn-outline-ro btn-block"
              @click="openModel('edit', item)">
                <font-awesome-icon :icon="['fas', 'edit']"/> 編輯
              </button>
              <button class="btn btn-outline-danger btn-block"
              @click="openModel('delete', item)">
                <font-awesome-icon :icon="['fas', 'trash-alt']"/> 刪除
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PaginationComponents
    :paginationService="pagination"
    v-on:pageService="getProducts"/>
    <div class="modal fade" id="productsModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{modelStatus}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProducts.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <font-awesome-icon :icon="['fas','spinner']" spin v-if="status.fileUploading"/>
                    <img src="@/assets/img/yJFR7SP.gif"
                    alt="努力上傳中"
                    width="25px"
                    v-if="status.fileUploading">
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="updataProductsImg()">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" alt="" :src="tempProducts.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題"  v-model="tempProducts.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <select
                    id="category"
                    class="form-control"
                    v-model="tempProducts.category">
                      <option value="" disabled>--請選擇分類--</option>
                      <option value="熱門商品">熱門商品</option>
                      <option value="組合優惠">組合優惠</option>
                      <option value="MVP武器">MVP武器</option>
                      <option value="MVP防具">MVP防具</option>
                      <option value="MVP卡片">MVP卡片</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                      <select
                      id="unit"
                      class="form-control"
                      v-model="tempProducts.unit">
                      <option value="" disabled>--請選擇單位--</option>
                      <option value="個">個</option>
                      <option value="組">組</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProducts.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProducts.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProducts.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProducts.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled"
                      v-model="tempProducts.is_enabled"
                      :true-value="1"
                      :false-value="0">
                    <label class="form-check-label" for="is_enabled" >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataProducts()">
              <font-awesome-icon
              :icon="['fas', 'spinner']"
              v-if="status.loadingItem"
              spin/>
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteProductsModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{modelTitle}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProducts.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleProducts">
              <font-awesome-icon
              :icon="['fas', 'spinner']"
              v-if="status.loadingItem"
              spin/>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
>>>>>>> parent of b53abf2... 後檯登入頁面調整
</template>

<script>
/* global $ */
import PaginationComponents from './Pagination';

export default {
  data() {
    return {
      products: [],
      tempProducts: {},
      pagination: {},
      openStatus: '',
      isLoading: false,
      modelStatus: '',
      modelTitle: '',
      status: {
        fileUploading: false,
        loadingItem: false,
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.pagination = response.data.pagination;
          vm.products = response.data.products;
          vm.isLoading = false;
        } else if (response.data.message === '驗證錯誤, 請重新登入') {
          vm.$router.push('/login');
          vm.isLoading = false;
        } else {
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
          vm.isLoading = false;
        }
      });
    },
    updataProducts() {
      const vm = this;
      let httpMethods = 'post';
      let url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/product/`;
      if (vm.modelStatus === 'edit') {
        httpMethods = 'put';
        url = `${process.env.APIPATH}/api/${
          process.env.COUSTOMPATH
        }/admin/product/${
          vm.tempProducts.id
        }`;
      }
      vm.status.loadingItem = true;
      this.$http[httpMethods](url, { data: vm.tempProducts }).then((response) => {
        if (response.data.success) {
          vm.status.loadingItem = false;
          $('#productsModal').modal('hide');
          switch (httpMethods) {
            case 'post':
              this.$bus.$emit('message:push',
                '資料新增成功(*ゝ∀･)v'
                , 'success');
              break;
            case 'put':
              this.$bus.$emit('message:push',
                '資料更新成功(*ゝ∀･)v'
                , 'success');
              break;
            default:
              this.$bus.$emit('message:push',
                '資料新增成功(*ゝ∀･)v'
                , 'success');
              break;
          }
          vm.getProducts();
          vm.tempProducts = [];
        } else {
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    updataProductsImg() {
      const uploadefFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadefFile);
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.success) {
          vm.$set(vm.tempProducts, 'imageUrl', response.data.imageUrl);
          this.$bus.$emit('message:push',
            '圖片上傳成功(*ゝ∀･)v'
            , 'success');
          vm.status.fileUploading = false;
        } else {
          vm.status.fileUploading = false;
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    deleProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.COUSTOMPATH
      }/admin/product/${vm.tempProducts.id}`;
      vm.status.loadingItem = true;
      this.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.status.loadingItem = false;
          $('#deleteProductsModal').modal('hide');
          this.$bus.$emit('message:push',
            '資料刪除成功(*ゝ∀･)v'
            , 'success');
          vm.getProducts();
        } else {
          vm.status.loadingItem = false;
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`
            , 'danger');
        }
      });
    },
    openModel(status, item) {
      const vm = this;
      switch (status) {
        case 'new':
          vm.modelTitle = '新增產品';
          vm.modelStatus = 'created';
          $('#productsModal').modal('show');
          break;
        case 'edit':
          vm.modelTitle = '編輯產品';
          vm.modelStatus = 'edit';
          $('#productsModal').modal('show');
          vm.tempProducts = Object.assign({}, item);
          break;
        case 'delete':
          vm.modelTitle = '刪除產品';
          vm.modelStatus = 'delete';
          $('#deleteProductsModal').modal('show');
          vm.tempProducts = Object.assign({}, item);
          break;
        default:
          $('#productsModal').modal('show');
          break;
      }
    },
    tempRemove() {
      $('#productsModal').on('hidden.bs.modal', () => {
        this.tempProducts = {};
      });
      $('#deleteProductsModal').on('hidden.bs.modal', () => {
        this.tempProducts = {};
      });
    },
  },
  components: {
    PaginationComponents,
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.tempRemove();
  },
};
</script>
