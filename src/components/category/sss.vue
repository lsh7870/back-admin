<template>
  <div>
    <el-breadcrumb style="margin-bottom:30px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
    <el-table
    :row-key="getRowKeys"
    :expand-row-keys="expands"
    :data="tableData"
    @expand-change="expandSelect"
  >
    <el-table-column type="expand" width="100">
      <template>
        <div>
          折叠面板内容
        </div>
      </template>
    </el-table-column>
    <el-table-column label="列1" prop="a" align="left" />
    <el-table-column label="列2" prop="b" align="left" />
  </el-table>
    </el-card>
  </div>
</template>

<script>
import { goodsCategory } from "../../nenwo/category";

export default {
  name: "Category",
  data() {
    return {
      querInfo: {},
      categoryList: [

      ],
           expands: [],
      getRowKeys(row) {
        return row.id
      },
      tableData: [
        {
          id: 1,
          a: '12',
          b: '34',
          children:[
          {  id: 1,
          a: '12',
          b: '34',}
          ]
        },
        {
          id: 2,
          a: '22',
          b: '44'
        }
      ],
       data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "二级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    this.goodsCategory();
  },
  methods: {
    goodsCategory() {
      goodsCategory().then((res) => {
        console.log(res[1]);
        // this.res[1]=
        this.categoryList = res[1];
      });
    },

     expandSelect(row, expandedRows) {
      var that = this
      // console.log(row);
      // console.log(expandedRows);
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.id)
        }
      } else {
        that.expands = []
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>