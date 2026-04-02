'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { teams, competitionsWithType } from '@/data/mock';
import { Plus, Users, MapPin, ChevronRight } from 'lucide-react';

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<typeof teams[0] | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [hasApplied, setHasApplied] = useState<Record<number, boolean>>({});

  const handleApply = (teamId: number) => {
    setHasApplied(prev => ({ ...prev, [teamId]: true }));
    setSelectedTeam(null);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-display text-3xl text-gray-800">Team Up</h1>
            <p className="text-muted-foreground mt-1">找到志同道合的队友</p>
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)} 
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            发布组队
          </Button>
        </div>

        {/* 卡片社区列表 */}
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start gap-6">
                {/* 左侧：项目信息 */}
                <div className="flex-1 min-w-0">
                  {/* 项目名称 */}
                  <h3 className="font-serif-display text-xl text-gray-800 mb-2">
                    {team.projectName}
                  </h3>
                  
                  {/* 目标竞赛 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="pill-tag bg-blue-50 text-blue-600">
                      {team.competition.length > 20 ? team.competition.slice(0, 20) + '...' : team.competition}
                    </span>
                  </div>
                  
                  {/* 描述 */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {team.description}
                  </p>

                  {/* 缺少技能 tags */}
                  <div className="flex flex-wrap gap-2">
                    {team.missingRoles.map((role) => (
                      <span key={role} className="pill-tag bg-amber-50 text-amber-700">
                        需要 {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 中间：成员头像 */}
                <div className="flex-shrink-0">
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(team.currentMembers, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-white flex items-center justify-center text-sm font-medium text-primary"
                      >
                        {['A', 'B', 'C'][i]}
                      </div>
                    ))}
                    {team.currentMembers > 3 && (
                      <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                        +{team.currentMembers - 3}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    {team.currentMembers}/{team.maxMembers} 人
                  </p>
                </div>

                {/* 右侧：加入按钮 */}
                <div className="flex-shrink-0">
                  <Button
                    className="h-10 px-5 rounded-xl bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors group-hover:bg-primary group-hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(team.id);
                    }}
                    disabled={hasApplied[team.id]}
                  >
                    {hasApplied[team.id] ? '已申请' : 'Join'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {teams.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">暂无组队信息</p>
          </div>
        )}

        {/* 组队详情弹窗 */}
        <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
          <DialogContent className="max-w-lg rounded-3xl">
            {selectedTeam && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-serif-display text-2xl">
                    {selectedTeam.projectName}
                  </DialogTitle>
                  <DialogDescription>
                    <span className="pill-tag bg-blue-50 text-blue-600 mt-2">
                      {selectedTeam.competition}
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">项目描述</h4>
                    <p className="text-sm text-gray-600">{selectedTeam.description}</p>
                  </div>
                  
                  {/* 队长信息 */}
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-lg font-medium text-primary">
                        {selectedTeam.leader.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{selectedTeam.leader.name}</p>
                        <p className="text-sm text-gray-500">{selectedTeam.leader.school}</p>
                      </div>
                    </div>
                  </div>

                  {/* 团队规模 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl text-center">
                      <p className="text-2xl font-bold text-primary">
                        {selectedTeam.currentMembers}/{selectedTeam.maxMembers}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">团队规模</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-2">缺少角色</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedTeam.missingRoles.map((role) => (
                          <span key={role} className="pill-tag bg-amber-50 text-amber-700 text-xs">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 现有成员 */}
                  {selectedTeam.members.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">现有成员</h4>
                      <div className="space-y-2">
                        {selectedTeam.members.map((member, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                {member.name[0]}
                              </div>
                              <span className="text-sm text-gray-700">{member.name}</span>
                            </div>
                            <span className="pill-tag bg-white text-gray-600 text-xs">
                              {member.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button 
                      className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90"
                      disabled={hasApplied[selectedTeam.id]}
                      onClick={() => handleApply(selectedTeam.id)}
                    >
                      {hasApplied[selectedTeam.id] ? '已申请' : '申请加入'}
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 rounded-xl">
                      联系队长
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* 发布组队弹窗 */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-lg rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-serif-display text-2xl">发布组队</DialogTitle>
              <DialogDescription>填写信息，寻找你的队友</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label>项目名称</Label>
                <Input placeholder="给你的项目起个名字" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>目标竞赛</Label>
                <Select>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="选择竞赛" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitionsWithType.filter(c => c.type === 'team').map((comp) => (
                      <SelectItem key={comp.id} value={comp.competitionName}>{comp.competitionName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>项目描述</Label>
                <Textarea placeholder="描述你的项目..." rows={3} className="rounded-xl resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>团队人数</Label>
                  <Input type="number" placeholder="如：4" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>缺少角色</Label>
                  <Input placeholder="如：前端、UI" className="h-12 rounded-xl" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90" onClick={() => setShowCreateDialog(false)}>
                  发布
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setShowCreateDialog(false)}>
                  取消
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
