define(["require", "exports"], function (require, exports) {
    "use strict";
    var Category = (function () {
        function Category() {
            this.categoryId = null;
            this.catName = "";
            this.catDescription = "";
            this.isDeleted = null;
            this.updatedLast = null;
            this.updatedBy = null;
            this.menus = new Array();
        }
        Category.prototype.setCategoryId = function (id) {
            this.categoryId = id;
        };
        Category.prototype.getCategoryId = function () {
            return this.categoryId;
        };
        Category.prototype.setCatName = function (name) {
            this.catName = name;
        };
        Category.prototype.getCatName = function () {
            return this.catName;
        };
        Category.prototype.setCatDescription = function (desc) {
            this.catDescription = desc;
        };
        Category.prototype.getCatDescription = function () {
            return this.catDescription;
        };
        Category.prototype.setIsDeleted = function (is_deleted) {
            this.isDeleted = is_deleted;
        };
        Category.prototype.getIsDeleted = function () {
            return this.isDeleted;
        };
        Category.prototype.setUpdatedLast = function (updated_last) {
            this.updatedLast = updated_last;
        };
        Category.prototype.getUpdatedLast = function () {
            return this.updatedLast;
        };
        Category.prototype.setUpdatedBy = function (updated_by) {
            this.updatedBy = updated_by;
        };
        Category.prototype.getUpdatedBy = function () {
            return this.updatedBy;
        };
        Category.prototype.setMenus = function (value) {
            this.menus = value;
        };
        Category.prototype.getMenus = function () {
            return this.menus;
        };
        Category.prototype.addMenus = function (value) {
            var found = false;
            var added = null;
            for (var i = 0; i < this.menus.length; i++) {
                var item = this.menus[i];
                if (value.getMenuId() == item.getMenuId()) {
                    found = true;
                }
            }
            if (!found) {
                this.menus.push(value);
                added = value;
            }
            return added;
        };
        Category.prototype.removeMenus = function (value) {
            var found = false;
            var removeMenusObj = null;
            var index_to_delete = null;
            for (var i = 0; i < this.menus.length; i++) {
                var item = this.menus[i];
                if (value.getMenuId() != item.getMenuId()) {
                }
                else {
                    index_to_delete = i;
                    removeMenusObj = value;
                }
            }
            if (index_to_delete !== null) {
                this.menus.splice(index_to_delete, 1);
            }
            return removeMenusObj;
        };
        Category.prototype.toJSON = function () {
            var me = this;
            function build() {
                var data = {
                    category_id: me.getCategoryId(),
                    catname: me.getCatName(),
                    catdescription: me.getCatDescription(),
                    is_deleted: me.getIsDeleted(),
                    updated_last: me.getUpdatedLast(),
                    updated_by: me.getUpdatedBy(),
                    menus: me.getMenus()
                };
                return data;
            }
            return build();
        };
        return Category;
    }());
    exports.Category = Category;
});
//# sourceMappingURL=Category.js.map