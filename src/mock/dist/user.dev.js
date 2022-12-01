"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mockjs = _interopRequireDefault(require("mockjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// get请求从config.url获取参数,post从config.body中获取参数
function param2Obj(url) {
  var search = url.split("?")[1];

  if (!search) {
    return {};
  }

  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

var List = [];
var count = 200;

for (var i = 0; i < count; i++) {
  List.push(_mockjs["default"].mock({
    id: _mockjs["default"].Random.guid(),
    name: _mockjs["default"].Random.cname(),
    addr: _mockjs["default"].mock("@county(true)"),
    "age|18-60": 1,
    birth: _mockjs["default"].Random.date(),
    sex: _mockjs["default"].Random.integer(0, 1)
  }));
}

var _default = {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。limit为每页10条
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: function getUserList(config) {
    var _param2Obj = param2Obj(config.url),
        name = _param2Obj.name,
        _param2Obj$page = _param2Obj.page,
        page = _param2Obj$page === void 0 ? 1 : _param2Obj$page,
        _param2Obj$limit = _param2Obj.limit,
        limit = _param2Obj$limit === void 0 ? 10 : _param2Obj$limit;

    var mockList = List.filter(function (user) {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false;
      return true;
    });
    var pageList = mockList.filter(function (item, index) {
      return index < limit * page && index >= limit * (page - 1);
    });
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    };
  },

  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: function createUser(config) {
    var _JSON$parse = JSON.parse(config.body),
        name = _JSON$parse.name,
        addr = _JSON$parse.addr,
        age = _JSON$parse.age,
        birth = _JSON$parse.birth,
        sex = _JSON$parse.sex;

    console.log(JSON.parse(config.body));
    List.unshift({
      id: _mockjs["default"].Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    });
    return {
      code: 20000,
      data: {
        message: "添加成功"
      }
    };
  },

  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: function deleteUser(config) {
    var _param2Obj2 = param2Obj(config.url),
        id = _param2Obj2.id;

    if (!id) {
      return {
        code: -999,
        message: "参数不正确"
      };
    } else {
      List = List.filter(function (u) {
        return u.id !== id;
      });
      return {
        code: 20000,
        message: "删除成功"
      };
    }
  },

  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: function batchremove(config) {
    var _param2Obj3 = param2Obj(config.url),
        ids = _param2Obj3.ids;

    ids = ids.split(",");
    List = List.filter(function (u) {
      return !ids.includes(u.id);
    });
    return {
      code: 20000,
      data: {
        message: "批量删除成功"
      }
    };
  },

  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: function updateUser(config) {
    var _JSON$parse2 = JSON.parse(config.body),
        id = _JSON$parse2.id,
        name = _JSON$parse2.name,
        addr = _JSON$parse2.addr,
        age = _JSON$parse2.age,
        birth = _JSON$parse2.birth,
        sex = _JSON$parse2.sex;

    var sex_num = parseInt(sex);
    List.some(function (u) {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = sex_num;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功"
      }
    };
  }
};
exports["default"] = _default;