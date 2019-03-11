<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"
        :class="{'disabled': !paginationService.has_pre}">
          <a class="page-link" href="#"
          @click.prevent="getPagesService(paginationService.current_page - 1)"
          tabindex="-1">Previous</a>
        </li>
        <li class="page-item"
        v-for="pages in paginationService.total_pages"
        :key="pages"
        :class="{'active': paginationService.current_page === pages}">
          <a class="page-link" href="#" @click.prevent="getPagesService(pages)">{{ pages }}</a>
        </li>
        <li class="page-item"
        :class="{'disabled': !paginationService.has_next}">
          <a class="page-link" href="#"
          @click.prevent="getPagesService(paginationService.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    paginationService: {
      type: Object,
    },
  },
  methods: {
    getPagesService(item) {
      this.$emit('pageService', item);
    },
  },
};
</script>
