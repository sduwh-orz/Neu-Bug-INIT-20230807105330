-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： otmdb.cn:25618
-- 生成日期： 2024-12-18 11:50:36
-- 服务器版本： 11.6.2-MariaDB-ubu2404
-- PHP 版本： 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `bug`
--

-- --------------------------------------------------------

--
-- 表的结构 `bug`
--

CREATE TABLE `bug` (
  `id` varchar(32) NOT NULL COMMENT 'Bug ID',
  `feature` varchar(32) NOT NULL COMMENT '功能ID',
  `name` text NOT NULL COMMENT 'Bug名称',
  `description` text NOT NULL COMMENT 'Bug描述',
  `grade` int(1) NOT NULL COMMENT 'Bug等级',
  `reporter` varchar(32) NOT NULL COMMENT '报告人',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT 'Bug状态',
  `solve_type` int(1) NOT NULL DEFAULT 0 COMMENT '解决形式',
  `created` timestamp NOT NULL COMMENT '创建时间',
  `modified` timestamp NULL DEFAULT NULL COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Bug';

--
-- 转存表中的数据 `bug`
--

INSERT INTO `bug` (`id`, `feature`, `name`, `description`, `grade`, `reporter`, `status`, `solve_type`, `created`, `modified`) VALUES
('120764D34B78486C82E6060C66406FB4', '98B51DDE7A6A4A68975C4CEEA005C6F4', '主题修改后，建议返回主题信息页', '主题修改后返回列表页，建议返回主题信息页', 3, '9C9F09EF62A5497A91B11D495D6B708A', 1, 0, '2016-09-13 08:52:00', NULL),
('213A05B68092418183D13121F83F3C9A', '32342B8700BB49E5AE858C2AC9000B3A', '【项目管理-项目添加】文本框未对齐', '反对方身份', 1, '1', 1, 0, '2016-08-08 07:44:00', '2016-09-06 04:06:00'),
('366E71B3E08A41698EF2FA47F1E85046', '2B63D30295A646B0A09BDAD5DBB8396D', '【项目管理-项目列表】查询出现错误', '【项目管理-项目列表】查询出现错误', 5, '1', 0, 2, '2016-08-08 07:44:00', '2016-09-06 04:06:00'),
('4903219053454E3487E5FA082622DA2E', 'DE94D3F8116049C298CEDB775F31F52E', '客户添加不进去', '客户添加不进去', 4, '1', 1, 4, '2016-08-09 03:09:00', '2016-09-13 08:39:00'),
('5B6CBBF4FB0E4FC399CE7D5D9B2A9043', '98B51DDE7A6A4A68975C4CEEA005C6F4', '主题的注册日期有换行', '主题的注册日期有换行', 3, '9C9F09EF62A5497A91B11D495D6B708A', 1, 0, '2016-09-13 08:53:00', NULL),
('9FD88A97C1D741F0A9EAB1E9296F7DCF', '96004780D68849899FD300377C7D48A5', '【bug管理-bug添加】没有校验', '', 3, '1', 0, 4, '2016-08-08 07:45:00', '2016-08-08 07:48:00'),
('BE3A5AF274AA4A6982A9E85ECD8C5180', '0CF68787A5B54308840EE05D1061F677', '【首页-导航栏】没有对齐', '', 1, '1', 0, 2, '2016-08-08 07:43:00', '2016-08-09 03:00:00'),
('C3D59CD0746F4EA79DF00EB07B11CA03', 'CF3524282B6E49B9822AB4CDEA9D1B30', '【首页】分页信息换行', '共0条 记录0页 1    页字换行了', 3, 'DF7BAE8153DC4BA7A966E2439E399E6F', 1, 0, '2016-09-13 08:24:00', NULL),
('E3367FEDD719436A91A85E2E94AABA67', '98B51DDE7A6A4A68975C4CEEA005C6F4', '添加校验的提示信息跑偏', '', 3, '1', 1, 0, '2016-09-13 08:47:00', NULL),
('EC9A4BFF1F2343CC8EC44ADE6F73165F', '4B023369623642AD918274E3CEF541EC', '【注册】测试用例有错误', '', 3, '1', 1, 0, '2016-09-13 08:36:00', NULL),
('F595224A8C7243AD95EE41E9AD173B46', 'BE84536DB2FC41638E3795EC64296E0F', '登录没有空校验', '', 1, '1', 0, 1, '2016-09-14 01:02:00', '2016-09-14 01:03:00');

-- --------------------------------------------------------

--
-- 表的结构 `bug_grade`
--

CREATE TABLE `bug_grade` (
  `id` int(1) NOT NULL COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '等级名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Bug等级';

--
-- 转存表中的数据 `bug_grade`
--

INSERT INTO `bug_grade` (`id`, `name`) VALUES
(1, '轻微'),
(2, '次要'),
(3, '一般'),
(4, '紧急'),
(5, '严重');

-- --------------------------------------------------------

--
-- 表的结构 `bug_record`
--

CREATE TABLE `bug_record` (
  `id` varchar(32) NOT NULL COMMENT 'Bug处理记录ID',
  `bug` varchar(32) NOT NULL COMMENT 'Bug ID',
  `type` varchar(2) NOT NULL COMMENT '操作类型',
  `previous` int(1) NOT NULL COMMENT '处理前状态',
  `after` int(1) NOT NULL COMMENT '处理后状态',
  `solve_type` int(1) DEFAULT NULL COMMENT '解决形式',
  `comment` text NOT NULL COMMENT '处理说明',
  `user` varchar(32) NOT NULL COMMENT '操作人',
  `time` timestamp NOT NULL COMMENT '处理时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Bug操作记录';

--
-- 转存表中的数据 `bug_record`
--

INSERT INTO `bug_record` (`id`, `bug`, `type`, `previous`, `after`, `solve_type`, `comment`, `user`, `time`) VALUES
('0292252E491C4C1FA7657B6373001178', '366E71B3E08A41698EF2FA47F1E85046', 'BJ', 1, 1, NULL, '【项目管理-项目列表】查询出现错误 进行编辑', '1', '2016-08-08 07:46:17'),
('0967FBFCD5644350AFFC9809F5EEBFB4', '366E71B3E08A41698EF2FA47F1E85046', 'DK', -1, 1, NULL, '重新开启了', '1', '2016-08-08 07:47:32'),
('22FC1160406C4147AE4D01017AE1D880', '366E71B3E08A41698EF2FA47F1E85046', 'BZ', 0, 0, NULL, '【项目管理-项目列表】查询出现错误 备注 解决验证通过', '1', '2016-08-08 07:46:58'),
('23164FCAF4D8474AAE46BDF17AE7E911', '4903219053454E3487E5FA082622DA2E', 'GB', 0, -1, NULL, 'bug已解决完毕', '1', '2016-09-13 08:38:51'),
('26979EBFA55A483EA293866E73D17EE7', '4903219053454E3487E5FA082622DA2E', 'BJ', 1, 1, NULL, '修改', '1', '2016-09-13 08:37:53'),
('29324ABDE3044014AB8853828C13F51B', 'BE3A5AF274AA4A6982A9E85ECD8C5180', 'BZ', 1, 1, NULL, '备注', '1', '2016-08-09 02:59:30'),
('2EBA03A019BC463CA146352AB374D559', '4903219053454E3487E5FA082622DA2E', 'BJ', 1, 1, NULL, '客户添加不进去', '1', '2016-08-09 03:09:48'),
('2EF22F7CBFBC45D6B68CAFCA16A4E93C', '366E71B3E08A41698EF2FA47F1E85046', 'JJ', 1, 0, 1, '【项目管理-项目列表】查询出现错误 已解决', '1', '2016-08-08 07:46:40'),
('34148767DEDC4D1190CF341D99E3FBB0', '213A05B68092418183D13121F83F3C9A', 'DK', -1, 1, NULL, '的', '1', '2016-09-06 04:06:32'),
('34B958CC975940F8A9411931E6FDFE6B', 'BE3A5AF274AA4A6982A9E85ECD8C5180', 'JJ', 0, 0, 2, '', '1', '2016-08-09 03:00:02'),
('3D74A45CC6664F05B6B091DCCA484843', '4903219053454E3487E5FA082622DA2E', 'BZ', 0, 0, NULL, '可以关闭了', '1', '2016-08-09 03:11:01'),
('457047264FD542D489A47D01610AC5DB', '213A05B68092418183D13121F83F3C9A', 'BJ', 1, 1, NULL, '打分', '1', '2016-09-06 04:06:11'),
('4E32B82263EC4C9BBB0A3FEDCB06F9CC', '4903219053454E3487E5FA082622DA2E', 'BZ', 1, 1, NULL, '已查看', '1', '2016-09-13 08:38:10'),
('57BE66640A874B919C1A7CFF78D8ABE1', '4903219053454E3487E5FA082622DA2E', 'JJ', 1, 0, 4, '已解决', '1', '2016-09-13 08:38:22'),
('5873D9C3BB27492BAF9D7F7A0B015630', '9FD88A97C1D741F0A9EAB1E9296F7DCF', 'JJ', 1, 0, 4, '已解决', '1', '2016-08-08 07:48:13'),
('6AAF687D78E04BD2AF110339879EC777', '366E71B3E08A41698EF2FA47F1E85046', 'JJ', 1, 0, 2, '【表情】', '1', '2016-09-06 04:06:56'),
('7F5DF01253154AC68F241D61724E77E5', 'F595224A8C7243AD95EE41E9AD173B46', 'BZ', 0, 0, NULL, '验证通过', '1', '2016-09-14 01:04:17'),
('8EB6B9950E5D41DBA0FD9561269257BF', '4903219053454E3487E5FA082622DA2E', 'JJ', 1, 0, 4, '目前添加好用', '1', '2016-08-09 03:10:20'),
('916FB700684C4597B1415A093385765B', '4903219053454E3487E5FA082622DA2E', 'DK', -1, 1, NULL, '还需要处理', '1', '2016-09-13 08:39:10'),
('94606001909A44D09AB3172BB114ECF3', '366E71B3E08A41698EF2FA47F1E85046', 'GB', 1, -1, NULL, '没问题  可以关闭', '1', '2016-08-08 07:47:53'),
('A349AACB2289401E8B9A7F12E662CD3A', '213A05B68092418183D13121F83F3C9A', 'GB', 1, -1, NULL, '放大', '1', '2016-09-06 04:06:23'),
('B70CBAC7D71B4F59A413BD2E8206443E', '4903219053454E3487E5FA082622DA2E', 'DK', -1, 1, NULL, '', '1', '2016-08-09 03:11:25'),
('B9D0CFDE566845D397C15D9CA1F35C55', 'F595224A8C7243AD95EE41E9AD173B46', 'JJ', 1, 0, 1, '已解决', '1', '2016-09-14 01:03:04'),
('C406139886A14F4D944AF9C03122A9A2', '366E71B3E08A41698EF2FA47F1E85046', 'DK', -1, 1, NULL, '打分 ', '1', '2016-09-06 04:06:39'),
('C970DE3BAB1741ED8296ADB1DCCF7889', '4903219053454E3487E5FA082622DA2E', 'GB', 0, -1, NULL, 'bug已解决 关闭', '1', '2016-08-09 03:11:17'),
('D3AE1474627E47599F4E3A2A004E9F09', '4903219053454E3487E5FA082622DA2E', 'BZ', 0, 0, NULL, '已解决', '1', '2016-08-09 03:10:34'),
('E2F8EEAAC9EE4538AEBDBE48B0F7E36A', '366E71B3E08A41698EF2FA47F1E85046', 'GB', 0, -1, NULL, '关闭', '1', '2016-08-08 07:47:25'),
('F46AC1FABC734697ABA925E2334B778E', 'BE3A5AF274AA4A6982A9E85ECD8C5180', 'JJ', 1, 0, 1, '', '1', '2016-08-09 02:59:55');

-- --------------------------------------------------------

--
-- 表的结构 `bug_record_type`
--

CREATE TABLE `bug_record_type` (
  `id` varchar(2) NOT NULL,
  `name` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `bug_record_type`
--

INSERT INTO `bug_record_type` (`id`, `name`) VALUES
('BJ', '编辑问题'),
('BZ', '写备注'),
('DK', '打开问题'),
('GB', '关闭问题'),
('JJ', '解决问题');

-- --------------------------------------------------------

--
-- 表的结构 `bug_solve_type`
--

CREATE TABLE `bug_solve_type` (
  `id` int(1) NOT NULL COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '解决形式名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Bug解决形式';

--
-- 转存表中的数据 `bug_solve_type`
--

INSERT INTO `bug_solve_type` (`id`, `name`) VALUES
(0, '未解决'),
(1, '解决'),
(2, '不是错误'),
(3, '错误重复'),
(4, '无法重现');

-- --------------------------------------------------------

--
-- 表的结构 `bug_status`
--

CREATE TABLE `bug_status` (
  `id` int(1) NOT NULL COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '状态名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Bug状态';

--
-- 转存表中的数据 `bug_status`
--

INSERT INTO `bug_status` (`id`, `name`) VALUES
(-1, '已关闭'),
(0, '已解决'),
(1, '开放中');

-- --------------------------------------------------------

--
-- 表的结构 `feature`
--

CREATE TABLE `feature` (
  `id` varchar(32) NOT NULL COMMENT '功能ID',
  `name` text NOT NULL COMMENT '功能名称',
  `module` varchar(32) NOT NULL COMMENT '模块ID',
  `hours` int(11) NOT NULL COMMENT '预计开发时长',
  `owner` varchar(32) DEFAULT NULL COMMENT '负责人'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='功能';

--
-- 转存表中的数据 `feature`
--

INSERT INTO `feature` (`id`, `name`, `module`, `hours`, `owner`) VALUES
('0CA0FAD48E3942B1892FAE9680490495', '客户删除', 'AEE4A72FEFAC4A8897310FB495F94D4C', 1, '4C8C480380AA465C9A280B44A1392D47'),
('0CF68787A5B54308840EE05D1061F677', '导航栏', '23479D7AFED24A77B816700D73A94558', 1, 'F83D2BFE2F6843D2A1BE1D4E1326CA70'),
('2B63D30295A646B0A09BDAD5DBB8396D', '项目列表', '53DFDDF54ED84FEE9ABA2DA11CFEA612', 2, '2'),
('2B736DB9F4384601A2A5EE73B38D7104', '我的话题', '12FB9AA1A5134C5BA5748EF7A098F1A4', 3, 'C07ADD0E08E849BDBA8547F4B4623E27'),
('32342B8700BB49E5AE858C2AC9000B3A', '项目添加', '53DFDDF54ED84FEE9ABA2DA11CFEA612', 2, '3'),
('40473C07071847D49E7107A89316390B', '用户添加', 'C8CDB73B26B542849BD47B9C796F6821', 1, '9C9F09EF62A5497A91B11D495D6B708A'),
('4B023369623642AD918274E3CEF541EC', '注册', '1610D0ED41B54C59A6A3F58AF5BCB4F3', 4, 'C07ADD0E08E849BDBA8547F4B4623E27'),
('4EAC9C92808B48DAB6A481E0FAD017E0', '登录', 'ABABB65F48C54524A0B05AE435E0EF5F', 4, NULL),
('5CBB855AC1AA4701936CA5B9E2684B46', '首页', '71D71E065EB44581AF033D98945E69AA', 5, 'C07ADD0E08E849BDBA8547F4B4623E27'),
('668EE778FC524EE3AA24314892F9C06F', '用户修改', 'C8CDB73B26B542849BD47B9C796F6821', 2, 'C07ADD0E08E849BDBA8547F4B4623E27'),
('787E021D17934C4F8127893F08031966', '编辑个人资料', '12FB9AA1A5134C5BA5748EF7A098F1A4', 2, 'DF7BAE8153DC4BA7A966E2439E399E6F'),
('7E154A02D9354481B17FA21B07D91B5B', '用户删除', 'B945024E227D4642ABB7337B940BB61C', 2, 'F83D2BFE2F6843D2A1BE1D4E1326CA70'),
('89953FF835A742F3981EBC616839B0DC', '用户添加', '7DF9D55CF31E458994403D4C5DE16158', 3, '2'),
('91A2C12A737447948F0D0E18A0A2C954', '我的收藏', '12FB9AA1A5134C5BA5748EF7A098F1A4', 5, 'DF7BAE8153DC4BA7A966E2439E399E6F'),
('96004780D68849899FD300377C7D48A5', 'bug添加', '6BBA9BB983D74355A8F65D1D7A373707', 2, 'C07ADD0E08E849BDBA8547F4B4623E27'),
('98B51DDE7A6A4A68975C4CEEA005C6F4', '首页', '1610D0ED41B54C59A6A3F58AF5BCB4F3', 12, 'DF7BAE8153DC4BA7A966E2439E399E6F'),
('BE84536DB2FC41638E3795EC64296E0F', '登录', '71D71E065EB44581AF033D98945E69AA', 4, 'DF7BAE8153DC4BA7A966E2439E399E6F'),
('BEE0E8D1EF8A4DBABA1DC95747502F9B', '用户修改', 'B945024E227D4642ABB7337B940BB61C', 2, '2'),
('CAAECBB9482D4964AE0D3CB905DD561D', 'bug解决', '6BBA9BB983D74355A8F65D1D7A373707', 2, 'C07ADD0E08E849BDBA8547F4B4623E27'),
('CF3524282B6E49B9822AB4CDEA9D1B30', '登录', '1610D0ED41B54C59A6A3F58AF5BCB4F3', 2, 'F83D2BFE2F6843D2A1BE1D4E1326CA70'),
('DE94D3F8116049C298CEDB775F31F52E', '客户添加', 'AEE4A72FEFAC4A8897310FB495F94D4C', 2, 'F83D2BFE2F6843D2A1BE1D4E1326CA70'),
('E3C54414D6FC4048A970A4127C2B2D74', '用户停用', '7DF9D55CF31E458994403D4C5DE16158', 1, '3'),
('EF35CA56C99C42DB9EA48D865D23D914', '用户添加', 'B945024E227D4642ABB7337B940BB61C', 2, '3'),
('F56DA8A70C2C4F7EA5F14FD486D24E92', '广告栏', '23479D7AFED24A77B816700D73A94558', 1, 'F83D2BFE2F6843D2A1BE1D4E1326CA70');

-- --------------------------------------------------------

--
-- 表的结构 `module`
--

CREATE TABLE `module` (
  `id` varchar(32) NOT NULL COMMENT '模块ID',
  `name` text NOT NULL COMMENT '模块名称',
  `project` varchar(32) NOT NULL COMMENT '项目ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='模块';

--
-- 转存表中的数据 `module`
--

INSERT INTO `module` (`id`, `name`, `project`) VALUES
('12FB9AA1A5134C5BA5748EF7A098F1A4', '个人中心', '63B00A8DB7CD411D849D2A33B276EF3F'),
('1610D0ED41B54C59A6A3F58AF5BCB4F3', '首页', '63B00A8DB7CD411D849D2A33B276EF3F'),
('23479D7AFED24A77B816700D73A94558', '首页', '10'),
('53DFDDF54ED84FEE9ABA2DA11CFEA612', '项目管理', '11'),
('6BBA9BB983D74355A8F65D1D7A373707', 'bug管理', '11'),
('71D71E065EB44581AF033D98945E69AA', '首页', 'DB53E5A7C4C34109978F323E15B6AB1F'),
('7DF9D55CF31E458994403D4C5DE16158', '用户管理', '9285E33B76B5406EB0142DFFDBB6DEE7'),
('ABABB65F48C54524A0B05AE435E0EF5F', '登录', '10'),
('AEE4A72FEFAC4A8897310FB495F94D4C', '客户管理', '9285E33B76B5406EB0142DFFDBB6DEE7'),
('B945024E227D4642ABB7337B940BB61C', '用户管理', '9'),
('C8CDB73B26B542849BD47B9C796F6821', '用户管理', 'E4D81C769A81436D984AE24AAAFDB2A9');

-- --------------------------------------------------------

--
-- 表的结构 `project`
--

CREATE TABLE `project` (
  `id` varchar(32) NOT NULL COMMENT '项目ID',
  `name` text NOT NULL COMMENT '项目名称',
  `keyword` varchar(50) NOT NULL COMMENT '项目关键字',
  `description` text NOT NULL COMMENT '项目描述',
  `owner` varchar(32) NOT NULL COMMENT '负责人',
  `created` timestamp NOT NULL COMMENT '创建日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='项目';

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`id`, `name`, `keyword`, `description`, `owner`, `created`) VALUES
('10', '个人博客系统', 'blog', '个人博客系统', '9C9F09EF62A5497A91B11D495D6B708A', '2016-07-25 03:16:11'),
('11', '软件缺陷管理系统', 'Bug', '软件缺陷管理系统', '9C9F09EF62A5497A91B11D495D6B708A', '2016-07-26 16:00:00'),
('63B00A8DB7CD411D849D2A33B276EF3F', '虚拟社区系统', 'bbs', '虚拟社区系统', '9C9F09EF62A5497A91B11D495D6B708A', '2016-09-13 08:10:09'),
('9', '网络教学平台', 'netp', '网络教学平台 课程', '9C9F09EF62A5497A91B11D495D6B708A', '2016-07-18 16:00:00'),
('9285E33B76B5406EB0142DFFDBB6DEE7', '客户关系管理系统', 'crm', '客户关系管理系统', '9C9F09EF62A5497A91B11D495D6B708A', '2016-08-09 03:01:59'),
('DB53E5A7C4C34109978F323E15B6AB1F', '网站发布系统', 'cms', '网站发布系统', 'CD15E4C175BD4E4687C20B867D288D6D', '2016-09-14 00:52:04'),
('E4D81C769A81436D984AE24AAAFDB2A9', '用户管理系统', 'user', '用户管理系统', 'F83D2BFE2F6843D2A1BE1D4E1326CA70', '2016-07-24 16:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` varchar(32) NOT NULL COMMENT '用户ID',
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `real_name` varchar(32) NOT NULL COMMENT '真实姓名',
  `role` int(1) NOT NULL DEFAULT 0 COMMENT '角色',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `deleted` int(1) NOT NULL DEFAULT 0 COMMENT '是否被删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `real_name`, `role`, `email`, `deleted`) VALUES
('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', 1, 'admin@126.com', 0),
('2', 'Json03', '11', 'Json', 0, 'Json@126.com', 0),
('20B66A7545154B048F3161F024F3DE04', 'sanchu', 'e10adc3949ba59abbe56e057f20f883e', '三楚', 0, '', 1),
('3', 'LiLei1', '11', 'LiLei', 0, 'LiLei@126.com', 0),
('4C8C480380AA465C9A280B44A1392D47', 'likaifa', 'e10adc3949ba59abbe56e057f20f883e', '李开發', 1, '', 0),
('9C9F09EF62A5497A91B11D495D6B708A', 'zhangjingli', 'e10adc3949ba59abbe56e057f20f883e', '张景丽', 0, 'zhangjingli@neusoft.org', 0),
('C07ADD0E08E849BDBA8547F4B4623E27', 'zhangli', 'e10adc3949ba59abbe56e057f20f883e', '张黎', 0, 'zhangli@neusoft.org', 0),
('CD15E4C175BD4E4687C20B867D288D6D', 'lijingli', 'e10adc3949ba59abbe56e057f20f883e', '李静莉', 0, 'lijingli@neusoft.org', 0),
('DF7BAE8153DC4BA7A966E2439E399E6F', 'wanghan', 'e10adc3949ba59abbe56e057f20f883e', '王晗', 0, '', 0),
('F4E712BA706E429BB6AB3D66E956980C', 'cuser2', 'e10adc3949ba59abbe56e057f20f883e', '普通用户2', 0, '12@neu.cn', 1),
('F83D2BFE2F6843D2A1BE1D4E1326CA70', 'bailu1', 'e10adc3949ba59abbe56e057f20f883e', '白鹭', 0, 'bailu@neusoft.org', 0);

-- --------------------------------------------------------

--
-- 表的结构 `user_role`
--

CREATE TABLE `user_role` (
  `id` int(1) NOT NULL COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '角色名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `user_role`
--

INSERT INTO `user_role` (`id`, `name`) VALUES
(0, '普通用户'),
(1, '管理员');

--
-- 转储表的索引
--

--
-- 表的索引 `bug`
--
ALTER TABLE `bug`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feature` (`feature`),
  ADD KEY `grade` (`grade`),
  ADD KEY `solve_type` (`solve_type`),
  ADD KEY `status` (`status`),
  ADD KEY `reporter` (`reporter`);

--
-- 表的索引 `bug_grade`
--
ALTER TABLE `bug_grade`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `bug_record`
--
ALTER TABLE `bug_record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bug` (`bug`),
  ADD KEY `bug_record_ibfk_1` (`after`),
  ADD KEY `bug_record_ibfk_2` (`previous`),
  ADD KEY `bug_record_ibfk_3` (`solve_type`),
  ADD KEY `bug_record_ibfk_5` (`user`),
  ADD KEY `type` (`type`);

--
-- 表的索引 `bug_record_type`
--
ALTER TABLE `bug_record_type`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `bug_solve_type`
--
ALTER TABLE `bug_solve_type`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `bug_status`
--
ALTER TABLE `bug_status`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feature`
--
ALTER TABLE `feature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module` (`module`),
  ADD KEY `name` (`name`(768)),
  ADD KEY `feature_ibfk_2` (`owner`);

--
-- 表的索引 `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project` (`project`),
  ADD KEY `name` (`name`(768));

--
-- 表的索引 `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `keyword` (`keyword`),
  ADD KEY `owner` (`owner`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING BTREE,
  ADD KEY `real_name` (`real_name`),
  ADD KEY `role` (`role`),
  ADD KEY `email` (`email`) USING BTREE;

--
-- 表的索引 `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- 限制导出的表
--

--
-- 限制表 `bug`
--
ALTER TABLE `bug`
  ADD CONSTRAINT `bug_ibfk_1` FOREIGN KEY (`grade`) REFERENCES `bug_grade` (`id`),
  ADD CONSTRAINT `bug_ibfk_2` FOREIGN KEY (`solve_type`) REFERENCES `bug_solve_type` (`id`),
  ADD CONSTRAINT `bug_ibfk_3` FOREIGN KEY (`status`) REFERENCES `bug_status` (`id`),
  ADD CONSTRAINT `bug_ibfk_4` FOREIGN KEY (`feature`) REFERENCES `feature` (`id`),
  ADD CONSTRAINT `bug_ibfk_5` FOREIGN KEY (`reporter`) REFERENCES `user` (`id`);

--
-- 限制表 `bug_record`
--
ALTER TABLE `bug_record`
  ADD CONSTRAINT `bug_record_ibfk_1` FOREIGN KEY (`after`) REFERENCES `bug_status` (`id`),
  ADD CONSTRAINT `bug_record_ibfk_2` FOREIGN KEY (`previous`) REFERENCES `bug_status` (`id`),
  ADD CONSTRAINT `bug_record_ibfk_3` FOREIGN KEY (`solve_type`) REFERENCES `bug_solve_type` (`id`),
  ADD CONSTRAINT `bug_record_ibfk_4` FOREIGN KEY (`bug`) REFERENCES `bug` (`id`),
  ADD CONSTRAINT `bug_record_ibfk_5` FOREIGN KEY (`user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `bug_record_ibfk_6` FOREIGN KEY (`type`) REFERENCES `bug_record_type` (`id`);

--
-- 限制表 `feature`
--
ALTER TABLE `feature`
  ADD CONSTRAINT `feature_ibfk_1` FOREIGN KEY (`module`) REFERENCES `module` (`id`),
  ADD CONSTRAINT `feature_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `user` (`id`);

--
-- 限制表 `module`
--
ALTER TABLE `module`
  ADD CONSTRAINT `module_ibfk_1` FOREIGN KEY (`project`) REFERENCES `project` (`id`);

--
-- 限制表 `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`);

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role`) REFERENCES `user_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
